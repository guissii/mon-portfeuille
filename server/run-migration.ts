import pg from 'pg';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function run() {
    try {
        const sql = fs.readFileSync('src/db/migration-003.sql', 'utf-8');
        await pool.query(sql);
        console.log('Migration 003 applied successfully');
    } catch (err: any) {
        console.error('Migration error:', err.message);
    } finally {
        await pool.end();
    }
}

run();
