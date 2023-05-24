CREATE DATABASE fishtrack;

CREATE TABLE fishing_report(
    fishing_report_id SERIAL PRIMARY KEY,
    author VARCHAR(255),
    date VARCHAR(255),
    time VARCHAR(255),
    spot VARCHAR(255),
    water_level VARCHAR(255),
    weather VARCHAR(255),
    type_of_fishing VARCHAR(255),
    bait VARCHAR(255),
    food VARCHAR(255),
    catch VARCHAR(255)
);