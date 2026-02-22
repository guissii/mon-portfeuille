import { Router, Request, Response } from 'express';
import pool from '../db/pool.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const { status } = req.query;
        let query = 'SELECT * FROM bookings WHERE 1=1';
        const params: any[] = [];
        if (status) { query += ' AND status = $1'; params.push(status); }
        query += ' ORDER BY booking_date DESC, booking_time DESC';
        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err: any) { res.status(500).json({ error: 'Erreur serveur' }); }
});

// Public endpoint - anyone can book
router.post('/', async (req: Request, res: Response) => {
    try {
        const { meeting_type, booking_date, booking_time, client_name, client_email, message } = req.body;
        if (!meeting_type || !booking_date || !booking_time || !client_name || !client_email) {
            res.status(400).json({ error: 'Tous les champs obligatoires doivent etre remplis' });
            return;
        }
        const result = await pool.query(
            `INSERT INTO bookings (meeting_type, booking_date, booking_time, client_name, client_email, message)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
            [meeting_type, booking_date, booking_time, client_name, client_email, message]
        );
        res.status(201).json(result.rows[0]);
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { status } = req.body;
        const result = await pool.query(
            `UPDATE bookings SET status=COALESCE($1,status) WHERE id=$2 RETURNING *`,
            [status, req.params.id]
        );
        if (result.rows.length === 0) { res.status(404).json({ error: 'Non trouve' }); return; }
        res.json(result.rows[0]);
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
    try {
        const result = await pool.query('DELETE FROM bookings WHERE id=$1 RETURNING id', [req.params.id]);
        if (result.rows.length === 0) { res.status(404).json({ error: 'Non trouve' }); return; }
        res.json({ success: true });
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

export default router;
