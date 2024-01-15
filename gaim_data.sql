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