import { Router, Request, Response } from 'express';
import pool from '../db/pool.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// GET /api/settings
router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM site_settings');
        const settings: Record<string, string> = {};
        for (const row of result.rows) {
            settings[row.key] = row.value;
        }
        res.json(settings);
    } catch (err: any) {
        console.error('Get settings error:', err.message);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// PUT /api/settings (admin)
router.put('/', authMiddleware, async (req: Request, res: Response) => {
    try {
        const updates = req.body;

        for (const [key, value] of Object.entries(updates)) {
            await pool.query(
                `INSERT INTO site_settings (key, value, updated_at)
         VALUES ($1, $2, NOW())
         ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = NOW()`,
                [key, value as string]
            );
        }

        // Return updated settings
        const result = await pool.query('SELECT * FROM site_settings');
        const settings: Record<string, string> = {};
        for (const row of result.rows) {
            settings[row.key] = row.value;
        }
        res.json(settings);
    } catch (err: any) {
        console.error('Update settings error:', err.message);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

export default router;
