import { Router, Request, Response } from 'express';
import pool from '../db/pool.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// GET /api/certifications
router.get('/', async (req: Request, res: Response) => {
    try {
        const { status, featured, limit } = req.query;
        let query = 'SELECT * FROM certifications WHERE 1=1';
        const params: any[] = [];
        let paramIndex = 1;

        if (status) {
            query += ` AND status = $${paramIndex++}`;
            params.push(status);
        }
        if (featured === 'true') {
            query += ' AND featured = true';
        }

        query += ' ORDER BY issue_date DESC';

        if (limit) {
            query += ` LIMIT $${paramIndex++}`;
            params.push(parseInt(limit as string));
        }

        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err: any) {
        console.error('Get certifications error:', err.message);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// GET /api/certifications/:slug
router.get('/:slug', async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM certifications WHERE slug = $1', [req.params.slug]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Certification non trouvee' });
            return;
        }
        res.json(result.rows[0]);
    } catch (err: any) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// POST /api/certifications (admin)
router.post('/', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { name, slug, issuer, issue_date, expiry_date, credential_id, verify_url, description, skills, image_url, badge_url, gallery, level, status, featured } = req.body;

        if (!name || !slug || !issuer || !issue_date) {
            res.status(400).json({ error: 'Nom, slug, emetteur et date requis' });
            return;
        }

        const result = await pool.query(
            `INSERT INTO certifications (name, slug, issuer, issue_date, expiry_date, credential_id, verify_url, description, skills, image_url, badge_url, gallery, level, status, featured)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
       RETURNING *`,
            [name, slug, issuer, issue_date, expiry_date || null, credential_id || null, verify_url || null, description || null, skills || [], image_url || null, badge_url || null, gallery || [], level || 'intermediate', status || 'draft', featured || false]
        );

        res.status(201).json(result.rows[0]);
    } catch (err: any) {
        if (err.code === '23505') {
            res.status(409).json({ error: 'Certification avec ce slug existe deja' });
            return;
        }
        console.error('Create certification error:', err.message);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// PUT /api/certifications/:id (admin)
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { name, slug, issuer, issue_date, expiry_date, credential_id, verify_url, description, skills, image_url, badge_url, gallery, level, status, featured } = req.body;

        // Use COALESCE only for required fields; nullable fields use direct assignment
        // so that null/empty values can clear previously set data (e.g. expiry_date)
        const result = await pool.query(
            `UPDATE certifications SET
        name = COALESCE($1, name),
        slug = COALESCE($2, slug),
        issuer = COALESCE($3, issuer),
        issue_date = COALESCE($4, issue_date),
        expiry_date = $5,
        credential_id = $6,
        verify_url = $7,
        description = $8,
        skills = COALESCE($9, skills),
        image_url = $10,
        badge_url = $11,
        gallery = COALESCE($12, gallery),
        level = COALESCE($13, level),
        status = COALESCE($14, status),
        featured = COALESCE($15, featured),
        updated_at = NOW()
       WHERE id = $16
       RETURNING *`,
            [name, slug, issuer, issue_date, expiry_date || null, credential_id || null, verify_url || null, description || null, skills, image_url || null, badge_url || null, gallery || [], level, status, featured, req.params.id]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Certification non trouvee' });
            return;
        }

        res.json(result.rows[0]);
    } catch (err: any) {
        console.error('Update certification error:', err.message);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// DELETE /api/certifications/:id (admin)
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            'DELETE FROM certifications WHERE id = $1 RETURNING id',
            [req.params.id]
        );
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Certification non trouvee' });
            return;
        }
        res.json({ success: true });
    } catch (err: any) {
        console.error('Delete certification error:', err.message);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

export default router;
