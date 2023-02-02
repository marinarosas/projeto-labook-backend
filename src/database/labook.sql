-- Active: 1675362052509@@127.0.0.1@3306

CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

SELECT * FROM users;

INSERT INTO users (id, name, email, password, role)
VALUES
    ("u001", "Marina", "marina@email.com", "M@arina123", "Administrador"),
    ("u002", "Alex", "alex@email.com", "@Lex123", "Usuário");
