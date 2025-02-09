require('dotenv').config();

const { createPool } = require('mysql2/promise');

const host = process.env.DB_HOST 
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const database = process.env.DB_DATABASE


const pool = createPool({
    host: host || "localhost",
    user: user || "root",
    password: password || "root",
    database: database || "ayd2_practica1",
    connectionLimit: 10
});

module.exports = pool;