const fs = require('node:fs');

class DocumentController {
  constructor(documentService) {
    this.documentService = documentService;
  }

  createDocument(req, res) {
    try {
      const document = this.documentService.createDocument(req.file, req.body?.owner);
      return res.status(201).json(document);
    } catch (error) {
      if (error.message === 'FILE_REQUIRED') {
        return res.status(400).json({ error: 'Um arquivo é obrigatório.' });
      }

      return res.status(500).json({ error: 'Erro ao processar o upload.' });
    }
  }

  listDocuments(req, res) {
    const documents = this.documentService.listDocuments();
    return res.status(200).json(documents);
  }

  downloadDocument(req, res) {
    try {
      const document = this.documentService.getDocumentById(req.params.id);

      if (!document.storagePath || !fs.existsSync(document.storagePath)) {
        return res.status(404).json({ error: 'Documento não encontrado.' });
      }

      return res.download(document.storagePath, document.originalName);
    } catch (error) {
      if (error.message === 'DOCUMENT_NOT_FOUND') {
        return res.status(404).json({ error: 'Documento não encontrado.' });
      }

      return res.status(500).json({ error: 'Erro ao baixar o documento.' });
    }
  }
}

module.exports = { DocumentController };
