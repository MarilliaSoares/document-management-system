class DocumentsService {
  constructor(documentRepository) {
    this.documentRepository = documentRepository;
  }

  createDocument(file, owner) {
    if (!file) {
      throw new Error('FILE_REQUIRED');
    }

    return this.documentRepository.createDocument(file, owner);
  }

  listDocuments() {
    return this.documentRepository.listDocuments();
  }

  getDocumentById(id) {
    const document = this.documentRepository.getDocumentById(id);

    if (!document) {
      throw new Error('DOCUMENT_NOT_FOUND');
    }

    return document;
  }
}

module.exports = { DocumentsService };
