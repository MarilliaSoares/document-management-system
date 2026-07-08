const express = require('express');
const multer = require('multer');
const path = require('node:path');
const { DocumentRepository } = require('../repositories/documentRepository');
const { DocumentService } = require('../services/documentService');
const { DocumentController } = require('../controllers/documentController');

const storageDir = path.resolve(__dirname, '..', '..', 'storage');
const upload = multer({
  storage: multer.diskStorage({
    destination: storageDir,
    filename: (_req, file, callback) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      callback(null, `${uniqueSuffix}-${file.originalname}`);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
});

const repository = new DocumentRepository(storageDir);
const service = new DocumentService(repository);
const controller = new DocumentController(service);

const router = express.Router();

router.post('/upload', upload.single('file'), (req, res) => controller.createDocument(req, res));
router.get('/documents', (req, res) => controller.listDocuments(req, res));
router.get('/documents/:id/download', (req, res) => controller.downloadDocument(req, res));

module.exports = router;
