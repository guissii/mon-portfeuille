import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import pool from '../db/pool.js';
import { authMiddleware, generateToken, AuthRequest } from '../middleware/auth.js';

const router = Router();

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: 'Email et mot de passe requis' });
            return;
        }

        const result = await pool.query(
            'SELECT * FROM admin_users WHERE email = $1',
            [email]
        );

        if (result.rows.length === 0) {
            res.status(401).json({ error: 'Email ou mot de passe incorrect' });
            return;
        }

        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.password_hash);

        if (!validPassword) {
            res.status(401).json({ error: 'Email ou mot de passe incorrect' });
            return;
        }

        // Update last sign in
        await pool.query(
            'UPDATE admin_users SET last_sign_in = NOW() WHERE id = $1',
            [user.id]
        );

        const token = generateToken(user.id, user.role);

        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err: any) {
        console.error('Login error:', err.message);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// GET /api/auth/me
router.get('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const result = await pool.query(
            'SELECT id, email, role, created_at, last_sign_in FROM admin_users WHERE id = $1',
            [req.userId]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Utilisateur non trouve' });
            return;
        }

        res.json({ user: result.rows[0] });
    } catch (err: any) {
        console.error('Auth me error:', err.message);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// POST /api/auth/logout
router.post('/logout', (req: Request, res: Response) => {
    // JWT is stateless, client just removes the token
    res.json({ success: true });
});

export default router;
