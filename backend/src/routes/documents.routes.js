const express = require('express');
const multer = require('multer');
const path = require('node:path');
const { DocumentsRepository } = require('../repositories/documents.repository');
const { DocumentsService } = require('../services/documents.service');
const { DocumentsController } = require('../controllers/documents.controller');

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

const repository = new DocumentsRepository(storageDir);
const service = new DocumentsService(repository);
const controller = new DocumentsController(service);

const router = express.Router();

router.post('/upload', upload.single('file'), (req, res) => controller.createDocument(req, res));
router.get('/documents', (req, res) => controller.listDocuments(req, res));
router.get('/documents/:id/download', (req, res) => controller.downloadDocument(req, res));

module.exports = router;
