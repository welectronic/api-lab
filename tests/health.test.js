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

test('GET /api/health responde 200 {"status":"ok"} en JSON', async () => {
  const res = await fetch(`${baseUrl}/api/health`);

  assert.equal(res.status, 200);
  assert.match(res.headers.get('content-type'), /^application\/json/);
  assert.deepStrictEqual(await res.json(), { status: 'ok' });
});
