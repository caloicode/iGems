// Import necessary modules
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// PostgreSQL database setup
const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Connect to the PostgreSQL database
const connectToDatabase = async () => {
  try {
    await db.connect();
    console.log('Connected to PostgreSQL database');
  } catch (err) {
    console.error('Error connecting to PostgreSQL database:', err.message);
  }
};

// Disconnect from the database
const disconnectFromDatabase = () => {
  db.end();
  console.log('Disconnected from PostgreSQL database');
};

// Table creation logic
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS gaim_data (
	id SERIAL PRIMARY KEY,
	date DATE,
	category TEXT,
	task TEXT,
	status VARCHAR(10),
	earned NUMERIC(4,1)
  );
`;

// Create the table
const createTable = async () => {
  try {
    await connectToDatabase();

    // Execute the table creation query
    await db.query(createTableQuery);

    console.log('Table created successfully');
  } catch (err) {
    console.error('Error creating table:', err.message);
  } finally {
    disconnectFromDatabase();
  }
};

// Call the createTable function to create the table
createTable();
