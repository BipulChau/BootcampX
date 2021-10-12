SELECT cohorts.name as cohort, COUNT(assignment_submissions.*) as total_submissions
FROM cohorts
JOIN students ON cohorts.id = cohort_id
JOIN assignment_submissions on students.id = student_id
GROUP BY cohort
ORDER BY total_submissions DESC;