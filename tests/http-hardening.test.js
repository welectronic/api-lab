const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const zlib = require('node:zlib');
const app = require('../app'); // Importa app, nunca server.js (conecta a las BD)

let server;
let baseUrl;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(() => new Promise((resolve) => server.close(resolve)));

// Comprueba los tres headers de protección y la ausencia de X-Powered-By (A6)
function assertHeaders(res) {
  assert.equal(res.headers.get('x-powered-by'), null);
  assert.equal(res.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(res.headers.get('x-frame-options'), 'DENY');
  assert.equal(res.headers.get('referrer-policy'), 'no-referrer');
}

// Comprueba status, content-type JSON y cuerpo exacto; devuelve el texto crudo
async function assertJsonError(res, status, body) {
  assert.equal(res.status, status);
  assert.equal(res.headers.get('content-type'), 'application/json; charset=utf-8');
  const text = await res.text();
  assert.deepStrictEqual(JSON.parse(text), body);
  return text;
}

// El cuerpo de error no filtra detalles internos
function assertNoLeak(text, extra = []) {
  for (const s of ['at ', 'node_modules', '\\', ...extra]) {
    assert.ok(!text.includes(s), `el cuerpo no debe contener ${JSON.stringify(s)}`);
  }
}

// JSON válido de aproximadamente `kb` kilobytes
function jsonOfSize(kb) {
  return JSON.stringify({ relleno: 'a'.repeat(kb * 1024) });
}

const NOT_FOUND = { error: 'Recurso no encontrado' };
const BAD_JSON = { error: 'JSON malformado' };
const TOO_LARGE = { error: 'Cuerpo demasiado grande' };

test('200: GET /api/health lleva los headers de protección y no X-Powered-By', async () => {
  const res = await fetch(`${baseUrl}/api/health`);

  assert.equal(res.status, 200);
  assertHeaders(res);
  assert.deepStrictEqual(await res.json(), { status: 'ok' });
});

test('404: GET / responde el cuerpo exacto en JSON con headers', async () => {
  const res = await fetch(`${baseUrl}/`);

  assertHeaders(res);
  await assertJsonError(res, 404, NOT_FOUND);
});

test('404: GET /api/no-existe responde el cuerpo exacto en JSON con headers', async () => {
  const res = await fetch(`${baseUrl}/api/no-existe`);

  assertHeaders(res);
  const text = await assertJsonError(res, 404, NOT_FOUND);
  assert.ok(!text.includes('no-existe'));
});

test('A5: la ruta pedida con <script> no se refleja en el 404', async () => {
  const res = await fetch(`${baseUrl}/api/<script>alert(1)</script>`);

  assertHeaders(res);
  const text = await assertJsonError(res, 404, NOT_FOUND);
  assertNoLeak(text, ['<script', 'script', 'alert']);
});

test('A4: JSON malformado responde 400 exacto, sin stack', async () => {
  const res = await fetch(`${baseUrl}/api/health`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{mal',
  });

  assertHeaders(res);
  const text = await assertJsonError(res, 400, BAD_JSON);
  assertNoLeak(text, ['SyntaxError', 'JSON.parse']);
});

test('A1: JSON de ~150 kb responde 413 exacto, sin stack', async () => {
  const res = await fetch(`${baseUrl}/api/health`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: jsonOfSize(150),
  });

  assertHeaders(res);
  const text = await assertJsonError(res, 413, TOO_LARGE);
  assertNoLeak(text, ['PayloadTooLargeError']);
});

test('A2: urlencoded de ~150 kb responde 413 exacto, sin stack', async () => {
  const res = await fetch(`${baseUrl}/api/health`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `relleno=${'a'.repeat(150 * 1024)}`,
  });

  assertHeaders(res);
  const text = await assertJsonError(res, 413, TOO_LARGE);
  assertNoLeak(text, ['PayloadTooLargeError']);
});

test('A3: JSON gzip pequeño que descomprime a más de 100 kb responde 413', async () => {
  const gz = zlib.gzipSync(jsonOfSize(150));
  assert.ok(gz.length < 100 * 1024, 'el cuerpo comprimido debe ocupar menos de 100 kb');

  const res = await fetch(`${baseUrl}/api/health`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Encoding': 'gzip' },
    body: gz,
  });

  assertHeaders(res);
  const text = await assertJsonError(res, 413, TOO_LARGE);
  assertNoLeak(text, ['PayloadTooLargeError']);
});

test('JSON válido de ~90 kb no recibe 413 ni 400', async () => {
  const res = await fetch(`${baseUrl}/api/health`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: jsonOfSize(90),
  });

  // POST /api/health no existe: el body se parsea bien y cae en el 404
  assertHeaders(res);
  await assertJsonError(res, 404, NOT_FOUND);
});
