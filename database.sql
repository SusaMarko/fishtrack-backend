CREATE DATABASE fishtrack;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

CREATE TABLE fishing_report(
    id SERIAL PRIMARY KEY,
    user_id UUID,
    created_at TIMESTAMP,
    spot VARCHAR(255),
    water_level INTEGER,
    weather VARCHAR(255),
    type_of_fishing VARCHAR(255),
    bait VARCHAR(255),
    food VARCHAR(255),
    the_catch VARCHAR(255),
    image BYTEA,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    user_id UUID,
    fishing_report_id INTEGER,
    created_at TIMESTAMP,
    comment_text VARCHAR(255),
    likes INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (fishing_report_id) REFERENCES fishing_report(id)
);

INSERT INTO users (user_name, user_password) VALUES ('Pera', '$2b$10$2455MFe1nE9FZ9fn1xQyION3JFODhW1//ywKUOCeleFdJCU6FGxwy');
INSERT INTO users (user_name, user_password) VALUES ('Zika', '$2b$10$D5NuoFwE9FHQzbY/SICPK.JGCn1Ars0sObegzzIyBHq4CV3Qxkatq');

INSERT INTO fishing_report (user_id, created_at, spot, water_level, weather, 
type_of_fishing, bait, food,the_catch)
VALUES ('c828df7f-6fb6-4701-8a7d-926d681319e1', '2023-06-11 11:15:32', 'brodotehnika', 401,
'suncano', 'fider', 'beli crvi', 'gica mix zuta kesa 500g',
'11 plotica i 3 babuske'
);

INSERT INTO comments (user_id, fishing_report_id, created_at, comment_text, likes)
VALUES ('c828df7f-6fb6-4701-8a7d-926d681319e1', '20', '2023-06-11 11:15:32', 'svaka cast', 6);