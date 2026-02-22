import { Router, Request, Response } from 'express';
import pool from '../db/pool.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const { status, category, featured, limit } = req.query;
        let query = 'SELECT * FROM articles WHERE 1=1';
        const params: any[] = [];
        let i = 1;
        if (status) { query += ` AND status = $${i++}`; params.push(status); }
        if (category) { query += ` AND category = $${i++}`; params.push(category); }
        if (featured === 'true') { query += ' AND featured = true'; }
        query += ' ORDER BY created_at DESC';
        if (limit) { query += ` LIMIT $${i++}`; params.push(parseInt(limit as string)); }
        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err: any) { res.status(500).json({ error: 'Erreur serveur' }); }
});

router.get('/:slug', async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM articles WHERE slug = $1', [req.params.slug]);
        if (result.rows.length === 0) { res.status(404).json({ error: 'Article non trouve' }); return; }
        res.json(result.rows[0]);
    } catch (err: any) { res.status(500).json({ error: 'Erreur serveur' }); }
});

router.post('/', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { title, slug, excerpt, content, category, read_time, cover_image, tags, status, featured } = req.body;
        const result = await pool.query(
            `INSERT INTO articles (title, slug, excerpt, content, category, read_time, cover_image, tags, status, featured)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
            [title, slug, excerpt, content, category, read_time || 5, cover_image, tags || [], status || 'draft', featured || false]
        );
        res.status(201).json(result.rows[0]);
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { title, slug, excerpt, content, category, read_time, cover_image, tags, status, featured } = req.body;
        const result = await pool.query(
            `UPDATE articles SET title=COALESCE($1,title), slug=COALESCE($2,slug), excerpt=COALESCE($3,excerpt),
       content=COALESCE($4,content), category=COALESCE($5,category), read_time=COALESCE($6,read_time),
       cover_image=COALESCE($7,cover_image), tags=COALESCE($8,tags), status=COALESCE($9,status),
       featured=COALESCE($10,featured), updated_at=NOW()
       WHERE id=$11 RETURNING *`,
            [title, slug, excerpt, content, category, read_time, cover_image, tags, status, featured, req.params.id]
        );
        if (result.rows.length === 0) { res.status(404).json({ error: 'Non trouve' }); return; }
        res.json(result.rows[0]);
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
    try {
        const result = await pool.query('DELETE FROM articles WHERE id=$1 RETURNING id', [req.params.id]);
        if (result.rows.length === 0) { res.status(404).json({ error: 'Non trouve' }); return; }
        res.json({ success: true });
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

export default router;
