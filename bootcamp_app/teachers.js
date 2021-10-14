const { Pool } = require("pg"); // connecting to the bootcampx database

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx",
});

const cohorts_name = process.argv[2] || "JUL02"; // malicious input from the user
const value = [cohorts_name];

const safe_query = `
SELECT
  DISTINCT teachers.name as teacher,
  cohorts.name as cohort
from
  teachers
  JOIN assistance_requests ON teachers.id = teacher_id
  JOIN students ON students.id = student_id
  JOIN cohorts ON cohorts.id = cohort_id
WHERE
  cohorts.name =$1
ORDER BY
  teacher
`;

pool
  .query(safe_query, value)
  .then((res) => {
    res.rows.forEach((row) => {
      console.log(`${row.cohort}: ${row.teacher}`);
    });
  })
  .catch((err) => console.error("query error", err.stack))
  .finally(() => pool.end());
