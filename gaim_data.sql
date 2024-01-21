CREATE TABLE gaim_data (
	id SERIAL PRIMARY KEY,
	date DATE,
	category TEXT,
	task TEXT,
	status VARCHAR(10),
	earned NUMERIC(4,1)
)

CREATE TABLE add_igem_log (
	id SERIAL PRIMARY KEY,
	gaim_data_id INTEGER REFERENCES gaim_data(id),
	date DATE, 
	igems_earned NUMERIC (4,1)
)

-- DUMP
pg_dump -h localhost -U postgres -d gaim -t gaim_data -f output_file.sql


-- JOIN gaim_data and add_igem_log
SELECT * FROM gaim_data 
	JOIN add_igem_log 
	ON add_igem_log.gaim_data_id = gaim_data.id;

-- Testing column update
UPDATE gaim_data
SET earned =
	CASE 
		WHEN id = 1 THEN 5
		WHEN id = 2 THEN 3
	ELSE earned
END;

--change timestamp data type to timestamptz
ALTER TABLE gaim_data 
	ALTER COLUMN 
	timestamp TYPE timestamptz

--change timestamp to date
ALTER TABLE gaim_data 
	ALTER COLUMN timestamp TYPE date;
	
ALTER TABLE gaim_data
	RENAME COLUMN timestamp TO date;

--sample update with in
UPDATE add_igem_log 
	SET date = '2024-01-04' 
	WHERE id IN (4,5);


-- DATA ANALYSIS:
-- View daily earnings:
SELECT date, SUM(igems_earned) AS total_value
	FROM add_igem_log
	GROUP BY date
	ORDER BY date;