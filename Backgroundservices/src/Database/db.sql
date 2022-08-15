SELECT * FROM users WHERE issent='0'



-- send emails after assigned project  

SELECT project.title, project.due_at, users.email, users.username
FROM project
INNER JOIN users
ON project.assigned_to = users.user_id WHERE users.assigned_project='yes';