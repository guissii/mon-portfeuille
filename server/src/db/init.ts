import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function init() {
    // Connect to postgres to create the database if needed
    const adminPool = new pg.Pool({
        connectionString: process.env.DATABASE_URL?.replace(/\/[^/]+$/, '/postgres'),
    });

    try {
        const dbName = process.env.DATABASE_URL?.split('/').pop()?.split('?')[0] || 'portfolio_guissi';
        const checkDb = await adminPool.query(
            `SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]
        );
        if (checkDb.rowCount === 0) {
            await adminPool.query(`CREATE DATABASE "${dbName}"`);
            console.log(`Database "${dbName}" created.`);
        } else {
            console.log(`Database "${dbName}" already exists.`);
        }
    } catch (err: any) {
        if (err.code !== '42P04') { // duplicate_database
            console.error('Error creating database:', err.message);
        }
    } finally {
        await adminPool.end();
    }

    // Now connect to the actual database and run schema + seed
    const pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        const schemaPath = path.join(__dirname, 'schema.sql');
        const seedPath = path.join(__dirname, 'seed.sql');

        const schema = fs.readFileSync(schemaPath, 'utf-8');
        const seed = fs.readFileSync(seedPath, 'utf-8');

        console.log('Running schema...');
        await pool.query(schema);
        console.log('Schema applied successfully.');

        console.log('Running seed...');
        await pool.query(seed);
        console.log('Seed data inserted successfully.');

        console.log('Database initialization complete!');
    } catch (err: any) {
        console.error('Error initializing database:', err.message);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

init();
