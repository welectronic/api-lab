const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const app = require('../app'); // Importa app, nunca server.js (conecta a las BD)

let server;
let baseUrl;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(() => new Promise((resolve) => server.close(resolve)));

async function consultarUptime() {
  const res = await fetch(`${baseUrl}/api/health/uptime`);
  return { res, body: await res.json() };
}

test('GET /api/health/uptime responde 200 {"uptimeSeconds": <entero ≥ 0>} en JSON', async () => {
  const { res, body } = await consultarUptime();

  assert.equal(res.status, 200);
  assert.match(res.headers.get('content-type'), /^application\/json/);
  assert.deepStrictEqual(Object.keys(body), ['uptimeSeconds']);
  assert.ok(Number.isInteger(body.uptimeSeconds), 'uptimeSeconds debe ser entero');
  assert.ok(body.uptimeSeconds >= 0, 'uptimeSeconds debe ser ≥ 0');
});

test('GET /api/health/uptime es monótono: la segunda consulta no es menor', async () => {
  const primera = await consultarUptime();
  await new Promise((r) => setTimeout(r, 1100));
  const segunda = await consultarUptime();

  assert.ok(
    segunda.body.uptimeSeconds >= primera.body.uptimeSeconds,
    `${segunda.body.uptimeSeconds} < ${primera.body.uptimeSeconds}`
  );
});
