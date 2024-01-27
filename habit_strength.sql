-- SELECT dates.date, COALESCE(SUM(igems_earned), 0) AS total_earnings
-- FROM generate_series(current_date - interval '6 days', current_date, interval '1 day') AS dates(date)
-- LEFT JOIN add_igem_log ON dates.date = add_igem_log.date
-- GROUP BY dates.date
-- ORDER BY dates.date;

SELECT dates.date, COALESCE(gd.task, 'Total') AS task, COALESCE(SUM(ail.igems_earned), 0) AS total_earnings
FROM generate_series(current_date - interval '6 days', current_date, interval '1 day') AS dates(date)
LEFT JOIN add_igem_log AS ail ON dates.date = ail.date
LEFT JOIN gaim_data AS gd ON ail.gaim_data_id = gd.id
GROUP BY dates.date, gd.task
ORDER BY dates.date, gd.task;


-- SELECT
--   gd.task, 
--   COALESCE(SUM(CASE WHEN ail.date = current_date - interval '6 days' THEN ail.igems_earned END), 0) AS day_1,
--   COALESCE(SUM(CASE WHEN ail.date = current_date - interval '5 days' THEN ail.igems_earned END), 0) AS day_2,
--   COALESCE(SUM(CASE WHEN ail.date = current_date - interval '4 days' THEN ail.igems_earned END), 0) AS day_3,
--   COALESCE(SUM(CASE WHEN ail.date = current_date - interval '3 days' THEN ail.igems_earned END), 0) AS day_4,
--   COALESCE(SUM(CASE WHEN ail.date = current_date - interval '2 days' THEN ail.igems_earned END), 0) AS day_5,
--   COALESCE(SUM(CASE WHEN ail.date = current_date - interval '1 day' THEN ail.igems_earned END), 0) AS day_6,
--   COALESCE(SUM(CASE WHEN ail.date = current_date THEN ail.igems_earned END), 0) AS day_7
-- FROM
--   generate_series(current_date - interval '6 days', current_date, interval '1 day') AS dates(date)
-- LEFT JOIN
--   add_igem_log AS ail ON dates.date = ail.date
-- LEFT JOIN
--   gaim_data AS gd ON ail.gaim_data_id = gd.id
-- WHERE
--   gd.task IS NOT NULL
-- GROUP BY
--   gd.task
-- ORDER BY
--   gd.task;


-- SELECT
--   gd.id,
--   gd.task,
--   COALESCE(SUM(CASE WHEN ail.date = current_date - interval '6 days' THEN ail.igems_earned END), 0) AS day_1,
--   COALESCE(SUM(CASE WHEN ail.date = current_date - interval '5 days' THEN ail.igems_earned END), 0) AS day_2,
--   COALESCE(SUM(CASE WHEN ail.date = current_date - interval '4 days' THEN ail.igems_earned END), 0) AS day_3,
--   COALESCE(SUM(CASE WHEN ail.date = current_date - interval '3 days' THEN ail.igems_earned END), 0) AS day_4,
--   COALESCE(SUM(CASE WHEN ail.date = current_date - interval '2 days' THEN ail.igems_earned END), 0) AS day_5,
--   COALESCE(SUM(CASE WHEN ail.date = current_date - interval '1 day' THEN ail.igems_earned END), 0) AS day_6,
--   COALESCE(SUM(CASE WHEN ail.date = current_date THEN ail.igems_earned END), 0) AS day_7
-- FROM
--   generate_series(current_date - interval '6 days', current_date, interval '1 day') AS dates(date)
-- LEFT JOIN
--   add_igem_log AS ail ON dates.date = ail.date
-- LEFT JOIN
--   gaim_data AS gd ON ail.gaim_data_id = gd.id
-- WHERE
--   gd.task IS NOT NULL
-- GROUP BY
--   gd.id, gd.task
-- ORDER BY
--   gd.task;


-- SELECT
--   gd.id,
--   gd.task,
--   COALESCE(ARRAY_AGG(COALESCE(ail.igems_earned, 0) ORDER BY dates.date), '{0, 0, 0, 0, 0, 0, 0}'::int[]) AS earnings_array
-- FROM
--   generate_series(current_date - interval '6 days', current_date, interval '1 day') AS dates(date)
-- CROSS JOIN
--   gaim_data AS gd
-- LEFT JOIN
--   add_igem_log AS ail ON dates.date = ail.date AND ail.gaim_data_id = gd.id
-- WHERE
--   gd.task IS NOT NULL
-- GROUP BY
--   gd.id, gd.task
-- ORDER BY
--   gd.id;

SELECT
  gd.id,
  gd.date,
  gd.category,
  gd.task,
  gd.status,
  gd.earned,
  COALESCE(ARRAY_AGG(COALESCE(ail.igems_earned, 0) ORDER BY dates.date), '{0, 0, 0, 0, 0, 0, 0}'::int[]) AS earnings_array
FROM
  generate_series(current_date - interval '6 days', current_date, interval '1 day') AS dates(date)
CROSS JOIN
  gaim_data AS gd
LEFT JOIN
  add_igem_log AS ail ON dates.date = ail.date AND ail.gaim_data_id = gd.id
WHERE
  gd.task IS NOT NULL
GROUP BY
  gd.id, gd.date, gd.category, gd.task, gd.status, gd.earned
ORDER BY
  gd.id;
