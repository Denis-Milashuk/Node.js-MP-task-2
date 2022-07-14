INSERT INTO users(login, password, age, is_deleted)
VALUES ('Anna', 'string', 32, false);

INSERT INTO groups (name, permissions)
VALUES ('Parents', 'READ, WRITE, DELETE');

INSERT INTO groups (name)
VALUES ('Children');

INSERT INTO groups_entities (group_id, user_id)
VALUES ((SELECT id FROM groups WHERE name = 'Parents'), (SELECT id FROM users WHERE login = 'Denis'));

INSERT INTO groups_entities (group_id, user_id)
VALUES ((SELECT id FROM groups WHERE name = 'Parents'), (SELECT id FROM users WHERE login = 'Anna'));

INSERT INTO groups_entities (group_id, user_id)
VALUES ((SELECT id FROM groups WHERE name = 'Children'), (SELECT id FROM users WHERE login = 'Dima'));

INSERT INTO groups_entities (group_id, user_id)
VALUES ((SELECT id FROM groups WHERE name = 'Children'), (SELECT id FROM users WHERE login = 'Unknown'));
