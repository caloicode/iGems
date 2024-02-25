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

CREATE TABLE completed_log(
	id SERIAL PRIMARY KEY,
	gaim_data_id INTEGER REFERENCES gaim_data(id),
	date DATE
)

-- ON DB MIGRATION (must handle primary key problem, kay murestart sa 1...)
-- ALTER SEQUENCE add_igem_log_id_seq RESTART WITH (SELECT MAX(id) FROM add_igem_log) + 1;
-- Get the maximum ID value
SELECT MAX(id) FROM add_igem_log;

-- Store the maximum ID value in a variable
DO $$
DECLARE max_id bigint;
BEGIN
    SELECT MAX(id) INTO max_id FROM add_igem_log;
    -- Alter the sequence to start from the maximum ID value plus 1
    EXECUTE format('ALTER SEQUENCE add_igem_log_id_seq RESTART WITH %s', max_id + 1);
END $$;


-- MINIFIED:
SELECT MAX(id) FROM add_igem_log; DO $$ DECLARE max_id bigint; BEGIN SELECT MAX(id) INTO max_id FROM add_igem_log; EXECUTE format('ALTER SEQUENCE add_igem_log_id_seq RESTART WITH %s', max_id + 1); END $$;
SELECT MAX(id) FROM gaim_data; DO $$ DECLARE max_id bigint; BEGIN SELECT MAX(id) INTO max_id FROM gaim_data; EXECUTE format('ALTER SEQUENCE gaim_data_id_seq RESTART WITH %s', max_id + 1); END $$;
SELECT MAX(id) FROM completed_log; DO $$ DECLARE max_id bigint; BEGIN SELECT MAX(id) INTO max_id FROM completed_log; EXECUTE format('ALTER SEQUENCE completed_log_id_seq RESTART WITH %s', max_id + 1); END $$;



-- view completed logs
SELECT cl.id, cl.date, gd.task, gd.earned FROM completed_log AS cl
	JOIN gaim_data AS gd
	ON gd.id = cl.gaim_data_id;

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

--EDIT (sample update with IN)
UPDATE add_igem_log 
	SET date = '2024-01-04' 
	WHERE id IN (4,5);


-- DATA ANALYSIS:
-- View daily earnings:
SELECT date, SUM(igems_earned) AS total_value
	FROM add_igem_log
	GROUP BY date
	ORDER BY date;

-- View hours spent per subject:
SELECT *, ROUND(earned/4) AS total_hours FROM gaim_data
