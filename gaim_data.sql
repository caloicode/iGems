CREATE TABLE gaim_data (
	id SERIAL PRIMARY KEY,
	timestamp TIMESTAMP,
	category TEXT,
	task TEXT,
	status VARCHAR(10),
	earned NUMERIC(4,1)
)

-- Testing column update
UPDATE gaim_data
SET earned =
	CASE 
		WHEN id = 1 THEN 5
		WHEN id = 2 THEN 3
	ELSE earned
END;

--change timestamp data type to timestamptz
ALTER TABLE gaim_data ALTER COLUMN timestamp TYPE timestamptz

--change timestamp to date
ALTER TABLE gaim_data 
	ALTER COLUMN timestamp TYPE date;
	
ALTER TABLE gaim_data
	RENAME COLUMN timestamp TO date;
