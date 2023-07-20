CREATE DATABASE fishtrack;

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
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);


INSERT INTO users (user_name,
user_password) VALUES ('Marko',
'ert456');


INSERT INTO fishing_report (created_at, spot, water_level, weather, 
type_of_fishing, bait, food,the_catch)
VALUES ('2023-05-26 12:34:56', 'kej blok 70', 415,
'kisan dan', 'plovak', 'beli crvi', 'gica mix crvena kesa 500g',
'10 plotica ko dlan i 15 nosara ko dlan'
);