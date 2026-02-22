import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { authMiddleware } from '../middleware/auth.js';

const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads';

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const subDir = (req as any).query.type || 'general';
        const dir = path.join(UPLOAD_DIR, subDir);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Type de fichier non autorise'));
        }
    },
});

const router = Router();

// POST /api/upload (admin)
router.post('/', authMiddleware, upload.single('file'), (req: Request, res: Response) => {
    if (!req.file) {
        res.status(400).json({ error: 'Aucun fichier envoye' });
        return;
    }

    const fileUrl = `/uploads/${(req as any).query.type || 'general'}/${req.file.filename}`;
    res.json({
        url: fileUrl,
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        size: req.file.size,
    });
});

// POST /api/upload/multiple (admin)
router.post('/multiple', authMiddleware, upload.array('files', 10), (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
        res.status(400).json({ error: 'Aucun fichier envoye' });
        return;
    }

    const urls = files.map(file => ({
        url: `/uploads/${(req as any).query.type || 'general'}/${file.filename}`,
        filename: file.filename,
        mimetype: file.mimetype,
        size: file.size,
    }));

    res.json(urls);
});

export default router;
