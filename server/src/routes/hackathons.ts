import { Router, Request, Response } from 'express';
import pool from '../db/pool.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// GET /api/hackathons
router.get('/', async (req: Request, res: Response) => {
    try {
        const { status, featured, limit } = req.query;
        let query = 'SELECT * FROM hackathons WHERE 1=1';
        const params: any[] = [];
        let paramIndex = 1;

        if (status) {
            query += ` AND status = $${paramIndex++}`;
            params.push(status);
        }
        if (featured === 'true') {
            query += ' AND featured = true';
        }

        query += ' ORDER BY event_date DESC';

        if (limit) {
            query += ` LIMIT $${paramIndex++}`;
            params.push(parseInt(limit as string));
        }

        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err: any) {
        console.error('Get hackathons error:', err.message);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// GET /api/hackathons/:slug
router.get('/:slug', async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM hackathons WHERE slug = $1', [req.params.slug]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Hackathon non trouve' });
            return;
        }
        res.json(result.rows[0]);
    } catch (err: any) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// POST /api/hackathons (admin)
router.post('/', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { name, slug, organizer, event_date, duration, result: hackResult, project_name, project_description, linked_project_id, role, team_size, team_members, problem, solution, implementation, learnings, tech_stack, demo_url, repo_url, slides_url, video_url, certificate_url, images, status, featured } = req.body;

        if (!name || !slug) {
            res.status(400).json({ error: 'Nom et slug requis' });
            return;
        }

        const dbResult = await pool.query(
            `INSERT INTO hackathons (name, slug, organizer, event_date, duration, result, project_name, project_description, linked_project_id, role, team_size, team_members, problem, solution, implementation, learnings, tech_stack, demo_url, repo_url, slides_url, video_url, certificate_url, images, status, featured)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25)
       RETURNING *`,
            [name, slug, organizer, event_date || null, duration, hackResult, project_name, project_description, linked_project_id || null, role, team_size, team_members || [], problem, solution, implementation, learnings || [], tech_stack || [], demo_url || null, repo_url || null, slides_url || null, video_url || null, certificate_url || null, images || [], status || 'draft', featured || false]
        );

        res.status(201).json(dbResult.rows[0]);
    } catch (err: any) {
        if (err.code === '23505') {
            res.status(409).json({ error: 'Hackathon avec ce slug existe deja' });
            return;
        }
        console.error('Create hackathon error:', err.message);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// PUT /api/hackathons/:id (admin)
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { name, slug, organizer, event_date, duration, result: hackResult, project_name, project_description, linked_project_id, role, team_size, team_members, problem, solution, implementation, learnings, tech_stack, demo_url, repo_url, slides_url, video_url, certificate_url, images, status, featured } = req.body;

        const dbResult = await pool.query(
            `UPDATE hackathons SET
        name = COALESCE($1, name),
        slug = COALESCE($2, slug),
        organizer = COALESCE($3, organizer),
        event_date = COALESCE($4, event_date),
        duration = COALESCE($5, duration),
        result = COALESCE($6, result),
        project_name = COALESCE($7, project_name),
        project_description = COALESCE($8, project_description),
        linked_project_id = COALESCE($9, linked_project_id),
        role = COALESCE($10, role),
        team_size = COALESCE($11, team_size),
        team_members = COALESCE($12, team_members),
        problem = COALESCE($13, problem),
        solution = COALESCE($14, solution),
        implementation = COALESCE($15, implementation),
        learnings = COALESCE($16, learnings),
        tech_stack = COALESCE($17, tech_stack),
        demo_url = COALESCE($18, demo_url),
        repo_url = COALESCE($19, repo_url),
        slides_url = COALESCE($20, slides_url),
        video_url = COALESCE($21, video_url),
        certificate_url = COALESCE($22, certificate_url),
        images = COALESCE($23, images),
        status = COALESCE($24, status),
        featured = COALESCE($25, featured),
        updated_at = NOW()
       WHERE id = $26
       RETURNING *`,
            [name, slug, organizer, event_date, duration, hackResult, project_name, project_description, linked_project_id, role, team_size, team_members, problem, solution, implementation, learnings, tech_stack, demo_url, repo_url, slides_url, video_url, certificate_url, images, status, featured, req.params.id]
        );

        if (dbResult.rows.length === 0) {
            res.status(404).json({ error: 'Hackathon non trouve' });
            return;
        }

        res.json(dbResult.rows[0]);
    } catch (err: any) {
        console.error('Update hackathon error:', err.message);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// DELETE /api/hackathons/:id (admin)
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            'DELETE FROM hackathons WHERE id = $1 RETURNING id',
            [req.params.id]
        );
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Hackathon non trouve' });
            return;
        }
        res.json({ success: true });
    } catch (err: any) {
        console.error('Delete hackathon error:', err.message);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

export default router;
