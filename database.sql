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