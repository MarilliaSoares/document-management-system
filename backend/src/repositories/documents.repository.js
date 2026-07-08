const fs = require('node:fs');
const crypto = require('node:crypto');

class DocumentsRepository {
  constructor(storageDir) {
    this.storageDir = storageDir;
    this.documents = [];
    this.ensureStorageDir();
  }

  ensureStorageDir() {
    fs.mkdirSync(this.storageDir, { recursive: true });
  }

  createDocument(file, owner = 'anonymous') {
    if (!file) {
      throw new Error('FILE_REQUIRED');
    }

    const id = crypto.randomUUID();
    const document = {
      id,
      originalName: file.originalname,
      size: file.size,
      uploadedAt: new Date().toISOString(),
      owner,
      mimeType: file.mimetype,
      storagePath: file.path,
    };

    this.documents.push(document);

    return document;
  }

  listDocuments() {
    return this.documents;
  }

  getDocumentById(id) {
    return this.documents.find((document) => document.id === id);
  }
}

module.exports = { DocumentsRepository };
