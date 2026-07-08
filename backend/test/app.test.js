const { test } = require('node:test');
const assert = require('node:assert');
const { once } = require('node:events');
const app = require('../src/app');

test('o app backend é exportado', () => {
  assert.ok(app, 'o app deve estar definido');
  assert.strictEqual(typeof app, 'function', 'o app Express deve ser uma função');
});

test('deve realizar o fluxo completo de upload, listagem e download', async () => {
  const server = app.listen(0);
  await once(server, 'listening');

  try {
    const { port } = server.address();
    const formData = new FormData();
    const fileContent = 'conteúdo de teste para o documento';

    formData.append('file', new Blob([fileContent], { type: 'text/plain' }), 'sample.txt');

    const uploadResponse = await fetch(`http://127.0.0.1:${port}/upload`, {
      method: 'POST',
      body: formData,
    });

    assert.strictEqual(uploadResponse.status, 201);
    const createdDocument = await uploadResponse.json();
    assert.strictEqual(createdDocument.originalName, 'sample.txt');
    assert.ok(createdDocument.id);

    const listResponse = await fetch(`http://127.0.0.1:${port}/documents`);
    assert.strictEqual(listResponse.status, 200);
    const documents = await listResponse.json();
    assert.strictEqual(documents.length, 1);
    assert.strictEqual(documents[0].originalName, 'sample.txt');

    const downloadResponse = await fetch(`http://127.0.0.1:${port}/documents/${createdDocument.id}/download`);
    assert.strictEqual(downloadResponse.status, 200);
    const downloadedContent = await downloadResponse.text();
    assert.strictEqual(downloadedContent, fileContent);
  } finally {
    server.close();
  }
});
