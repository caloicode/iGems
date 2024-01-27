const gdhs = `SELECT
gd.id,
gd.date,
gd.category,
gd.task,
gd.status,
gd.earned,
COALESCE(ARRAY_AGG(COALESCE(ail.igems_earned, 0) ORDER BY dates.date), '{0, 0, 0, 0, 0, 0, 0}'::numeric[]) AS habit_strength
FROM
generate_series(current_date - interval '6 days', current_date, interval '1 day') AS dates(date)
CROSS JOIN
gaim_data AS gd
LEFT JOIN (
SELECT
  gaim_data_id,
  date,
  COALESCE(SUM(igems_earned), 0) AS igems_earned
FROM
  add_igem_log
WHERE
  date BETWEEN current_date - interval '6 days' AND current_date
GROUP BY
  gaim_data_id, date
) AS ail ON dates.date = ail.date AND ail.gaim_data_id = gd.id
WHERE
gd.task IS NOT NULL
GROUP BY
gd.id, gd.date, gd.category, gd.task, gd.status, gd.earned
ORDER BY
gd.id;`;

export default gdhs;
