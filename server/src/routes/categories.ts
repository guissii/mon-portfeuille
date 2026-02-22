import { Router, Request, Response } from 'express';
import pool from '../db/pool.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// GET /api/categories
router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            'SELECT * FROM categories ORDER BY sort_order ASC'
        );
        res.json(result.rows);
    } catch (err: any) {
        console.error('Get categories error:', err.message);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// GET /api/categories/:id
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM categories WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Categorie non trouvee' });
            return;
        }
        res.json(result.rows[0]);
    } catch (err: any) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// POST /api/categories (admin)
router.post('/', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { name, slug, description, icon, color, sort_order } = req.body;

        if (!name || !slug) {
            res.status(400).json({ error: 'Nom et slug requis' });
            return;
        }

        const result = await pool.query(
            `INSERT INTO categories (name, slug, description, icon, color, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
            [name, slug, description || null, icon || null, color || null, sort_order || 0]
        );

        res.status(201).json(result.rows[0]);
    } catch (err: any) {
        if (err.code === '23505') {
            res.status(409).json({ error: 'Categorie avec ce nom ou slug existe deja' });
            return;
        }
        console.error('Create category error:', err.message);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// PUT /api/categories/:id (admin)
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { name, slug, description, icon, color, sort_order } = req.body;

        const result = await pool.query(
            `UPDATE categories SET
        name = COALESCE($1, name),
        slug = COALESCE($2, slug),
        description = COALESCE($3, description),
        icon = COALESCE($4, icon),
        color = COALESCE($5, color),
        sort_order = COALESCE($6, sort_order),
        updated_at = NOW()
       WHERE id = $7
       RETURNING *`,
            [name, slug, description, icon, color, sort_order, req.params.id]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Categorie non trouvee' });
            return;
        }

        res.json(result.rows[0]);
    } catch (err: any) {
        console.error('Update category error:', err.message);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// DELETE /api/categories/:id (admin)
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            'DELETE FROM categories WHERE id = $1 RETURNING id',
            [req.params.id]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Categorie non trouvee' });
            return;
        }

        res.json({ success: true });
    } catch (err: any) {
        console.error('Delete category error:', err.message);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

export default router;
