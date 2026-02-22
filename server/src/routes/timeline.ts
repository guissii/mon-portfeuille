import { Router, Request, Response } from 'express';
import pool from '../db/pool.js';

const router = Router();

// GET /api/timeline
router.get('/', async (req: Request, res: Response) => {
    try {
        const { limit } = req.query;
        let query = 'SELECT * FROM timeline_events ORDER BY event_date DESC';
        const params: any[] = [];

        if (limit) {
            query += ' LIMIT $1';
            params.push(parseInt(limit as string));
        }

        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err: any) {
        console.error('Get timeline error:', err.message);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

export default router;
