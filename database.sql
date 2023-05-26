CREATE DATABASE fishtrack;

CREATE TABLE fishing_report(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP,
    spot VARCHAR(255),
    water_level INTEGER,
    weather VARCHAR(255),
    type_of_fishing VARCHAR(255),
    bait VARCHAR(255),
    food VARCHAR(255),
    the_catch VARCHAR(255)
);

INSERT INTO fishing_report (created_at, spot, water_level, weather, 
type_of_fishing, bait, food,the_catch)
VALUES ('2023-05-26 12:34:56', 'kej blok 70', 415,
'kisan dan', 'plovak', 'beli crvi', 'gica mix crvena kesa 500g',
'10 plotica ko dlan i 15 nosara ko dlan'
);