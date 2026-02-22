import { Router, Request, Response } from 'express';
import pool from '../db/pool.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// GET /api/projects
router.get('/', async (req: Request, res: Response) => {
    try {
        const { status, featured, category, limit } = req.query;

        let query = `
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM projects p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `;
        const params: any[] = [];
        let paramIndex = 1;

        if (status) {
            query += ` AND p.status = $${paramIndex++}`;
            params.push(status);
        }

        if (featured === 'true') {
            query += ` AND p.featured = true`;
        }

        if (category) {
            query += ` AND c.slug = $${paramIndex++}`;
            params.push(category);
        }

        query += ' ORDER BY p.created_at DESC';

        if (limit) {
            query += ` LIMIT $${paramIndex++}`;
            params.push(parseInt(limit as string));
        }

        const result = await pool.query(query, params);

        // Fetch screenshots for each project
        const projects = await Promise.all(
            result.rows.map(async (project) => {
                const screenshots = await pool.query(
                    'SELECT * FROM project_screenshots WHERE project_id = $1 ORDER BY sort_order ASC',
                    [project.id]
                );
                return { ...project, screenshots: screenshots.rows };
            })
        );

        res.json(projects);
    } catch (err: any) {
        console.error('Get projects error:', err.message);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// GET /api/projects/:slug
router.get('/:slug', async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            `SELECT p.*, c.name as category_name, c.slug as category_slug
       FROM projects p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.slug = $1`,
            [req.params.slug]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Projet non trouve' });
            return;
        }

        const project = result.rows[0];

        // Get screenshots
        const screenshots = await pool.query(
            'SELECT * FROM project_screenshots WHERE project_id = $1 ORDER BY sort_order ASC',
            [project.id]
        );

        res.json({ ...project, screenshots: screenshots.rows });
    } catch (err: any) {
        console.error('Get project error:', err.message);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// POST /api/projects (admin)
router.post('/', authMiddleware, async (req: Request, res: Response) => {
    try {
        const {
            title, slug, tagline, description, problem, solution, impact,
            metrics, stack, learnings, cover_image, gallery, github_url,
            live_url, demo_url, documentation_url, pdf_url, role, team_size, duration,
            status, featured, category_id, screenshots
        } = req.body;

        if (!title || !slug) {
            res.status(400).json({ error: 'Titre et slug requis' });
            return;
        }

        const result = await pool.query(
            `INSERT INTO projects (
        title, slug, tagline, description, problem, solution, impact,
        metrics, stack, learnings, cover_image, gallery, github_url,
        live_url, demo_url, documentation_url, pdf_url, role, team_size, duration,
        status, featured, category_id
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23)
      RETURNING *`,
            [
                title, slug, tagline, description, problem, solution, impact,
                JSON.stringify(metrics || []), JSON.stringify(stack || {}),
                learnings || [], cover_image, gallery || [], github_url,
                live_url, demo_url, documentation_url, pdf_url || null, role, team_size, duration,
                status || 'draft', featured || false, category_id || null
            ]
        );

        // Insert screenshots if provided
        if (screenshots && Array.isArray(screenshots)) {
            for (let i = 0; i < screenshots.length; i++) {
                await pool.query(
                    `INSERT INTO project_screenshots (project_id, image_url, caption, sort_order)
           VALUES ($1, $2, $3, $4)`,
                    [result.rows[0].id, screenshots[i].image_url, screenshots[i].caption || null, i]
                );
            }
        }

        res.status(201).json(result.rows[0]);
    } catch (err: any) {
        if (err.code === '23505') {
            res.status(409).json({ error: 'Un projet avec ce slug existe deja' });
            return;
        }
        console.error('Create project error:', err.message);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// PUT /api/projects/:id (admin)
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
    try {
        const {
            title, slug, tagline, description, problem, solution, impact,
            metrics, stack, learnings, cover_image, gallery, github_url,
            live_url, demo_url, documentation_url, pdf_url, role, team_size, duration,
            status, featured, category_id, screenshots
        } = req.body;

        const result = await pool.query(
            `UPDATE projects SET
        title = COALESCE($1, title),
        slug = COALESCE($2, slug),
        tagline = COALESCE($3, tagline),
        description = COALESCE($4, description),
        problem = COALESCE($5, problem),
        solution = COALESCE($6, solution),
        impact = COALESCE($7, impact),
        metrics = COALESCE($8, metrics),
        stack = COALESCE($9, stack),
        learnings = COALESCE($10, learnings),
        cover_image = COALESCE($11, cover_image),
        gallery = COALESCE($12, gallery),
        github_url = COALESCE($13, github_url),
        live_url = COALESCE($14, live_url),
        demo_url = COALESCE($15, demo_url),
        documentation_url = COALESCE($16, documentation_url),
        pdf_url = COALESCE($17, pdf_url),
        role = COALESCE($18, role),
        team_size = COALESCE($19, team_size),
        duration = COALESCE($20, duration),
        status = COALESCE($21, status),
        featured = COALESCE($22, featured),
        category_id = COALESCE($23, category_id),
        updated_at = NOW()
       WHERE id = $24
       RETURNING *`,
            [
                title, slug, tagline, description, problem, solution, impact,
                metrics ? JSON.stringify(metrics) : null,
                stack ? JSON.stringify(stack) : null,
                learnings, cover_image, gallery, github_url,
                live_url, demo_url, documentation_url, pdf_url, role, team_size, duration,
                status, featured, category_id, req.params.id
            ]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Projet non trouve' });
            return;
        }

        // Update screenshots if provided
        if (screenshots && Array.isArray(screenshots)) {
            await pool.query('DELETE FROM project_screenshots WHERE project_id = $1', [req.params.id]);
            for (let i = 0; i < screenshots.length; i++) {
                await pool.query(
                    `INSERT INTO project_screenshots (project_id, image_url, caption, sort_order)
           VALUES ($1, $2, $3, $4)`,
                    [req.params.id, screenshots[i].image_url, screenshots[i].caption || null, i]
                );
            }
        }

        res.json(result.rows[0]);
    } catch (err: any) {
        console.error('Update project error:', err.message);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// DELETE /api/projects/:id (admin)
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            'DELETE FROM projects WHERE id = $1 RETURNING id',
            [req.params.id]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Projet non trouve' });
            return;
        }

        res.json({ success: true });
    } catch (err: any) {
        console.error('Delete project error:', err.message);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

export default router;
