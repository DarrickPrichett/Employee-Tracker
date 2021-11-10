USE employeeDb;
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 4, 1),
  ('Virginia', 'Woolf', 4, 2),
  ('Piers', 'Gaveston', 3, 3),
  ('Charles', 'LeRoi', 3, 4),
  ('Katherine', 'Mansfield',4 , 5),
  ('Dora', 'Carrington', 3, 6),
  ('Edward', 'Bellamy', 3, 7),
  ('Montague', 'Summers', 4, 2),
  ('Octavia', 'Butler', 4, 3),
  ('Unica', 'Zurn', 3, 5);

INSERT INTO role (title, salary, department_id)
VALUES
    ('ceo', 1000000, NULL),
    ('manager', 300000, 1),
    ('engineer', 70000, 2),
    ('intern', 30000, 2);
    

INSERT INTO department (departmentName)
VALUES
    ('marketing'),
    ('product'),
    ('customerExperience'),
    ('humanResources'),
    ('finance'),
    ('sales'),
    ('technology');

INSERT INTO manager (first_name, last_name, role_id)
VALUES
  ('Darryl', 'Major', 2),
  ('Corey', 'Minner', 2),
  ('Michael', 'Pearl', 2),
  ('Tracy', 'Hill', 2),
  ('Lanora', 'Westbrook', 2),
  ('Carlos', 'Sylvester', 2),
  ('James', 'Brooks', 2);

