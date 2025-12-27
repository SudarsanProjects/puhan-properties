-- This command is for setting up the 'enquiries' table in your PostgreSQL database.
-- You can run this command in the "Shell" tab of your PostgreSQL database on Render.

CREATE TABLE enquiries (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    mobile TEXT NOT NULL,
    email TEXT,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
