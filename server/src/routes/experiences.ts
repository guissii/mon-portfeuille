import { Router, Request, Response } from 'express';
import pool from '../db/pool.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const { status } = req.query;
        let query = 'SELECT * FROM experiences WHERE 1=1';
        const params: any[] = [];
        if (status) { query += ' AND status = $1'; params.push(status); }
        query += ' ORDER BY sort_order ASC, start_date DESC';
        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err: any) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

router.post('/', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { company, position, start_date, end_date, current, description, responsibilities, technologies, location, company_url, logo_url, sort_order, status } = req.body;
        const result = await pool.query(
            `INSERT INTO experiences (company, position, start_date, end_date, current, description, responsibilities, technologies, location, company_url, logo_url, sort_order, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
            [company, position, start_date, end_date, current || false, description, responsibilities || [], technologies || [], location, company_url, logo_url, sort_order || 0, status || 'draft']
        );
        res.status(201).json(result.rows[0]);
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { company, position, start_date, end_date, current, description, responsibilities, technologies, location, company_url, logo_url, sort_order, status } = req.body;
        const result = await pool.query(
            `UPDATE experiences SET company=COALESCE($1,company), position=COALESCE($2,position),
       start_date=COALESCE($3,start_date), end_date=COALESCE($4,end_date), current=COALESCE($5,current),
       description=COALESCE($6,description), responsibilities=COALESCE($7,responsibilities), technologies=COALESCE($8,technologies),
       location=COALESCE($9,location), company_url=COALESCE($10,company_url), logo_url=COALESCE($11,logo_url),
       sort_order=COALESCE($12,sort_order), status=COALESCE($13,status), updated_at=NOW()
       WHERE id=$14 RETURNING *`,
            [company, position, start_date, end_date, current, description, responsibilities, technologies, location, company_url, logo_url, sort_order, status, req.params.id]
        );
        if (result.rows.length === 0) { res.status(404).json({ error: 'Non trouve' }); return; }
        res.json(result.rows[0]);
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
    try {
        const result = await pool.query('DELETE FROM experiences WHERE id=$1 RETURNING id', [req.params.id]);
        if (result.rows.length === 0) { res.status(404).json({ error: 'Non trouve' }); return; }
        res.json({ success: true });
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

export default router;
