import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Routes
import authRoutes from './routes/auth.js';
import categoriesRoutes from './routes/categories.js';
import projectsRoutes from './routes/projects.js';
import certificationsRoutes from './routes/certifications.js';
import hackathonsRoutes from './routes/hackathons.js';
import timelineRoutes from './routes/timeline.js';
import settingsRoutes from './routes/settings.js';
import uploadRoutes from './routes/upload.js';
import educationRoutes from './routes/education.js';
import experiencesRoutes from './routes/experiences.js';
import articlesRoutes from './routes/articles.js';
import bookingsRoutes from './routes/bookings.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
    credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
const uploadDir = process.env.UPLOAD_DIR || './uploads';
app.use('/uploads', express.static(path.resolve(uploadDir)));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/certifications', certificationsRoutes);
app.use('/api/hackathons', hackathonsRoutes);
app.use('/api/timeline', timelineRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/experiences', experiencesRoutes);
app.use('/api/articles', articlesRoutes);
app.use('/api/bookings', bookingsRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api`);
});

export default app;
