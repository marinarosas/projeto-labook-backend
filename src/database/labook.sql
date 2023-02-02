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

CREATE TABLE posts(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL,
    dislikes INTEGER DEFAULT(0) NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL
);

SELECT * FROM posts;

INSERT INTO posts (id, creator_id, content)
VALUES
    ("p001", "u001", "Feliz por estar no curso!"),
    ("p002", "u001", "Cansativo o dia!"),
    ("p003", "u002", "Trabalhando muito!");

CREATE TABLE likes_dislikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
);

SELECT * FROM likes_dislikes;

INSERT INTO likes_dislikes (user_id, post_id, like)
VALUES
    ("u001", "p001", 397),
    ("u001", "p002", 269),
    ("u002", "p003", 35);