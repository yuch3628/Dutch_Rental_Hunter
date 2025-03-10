CREATE TABLE HOUSE(
	id SERIAL PRIMARY KEY,
	address VARCHAR(50) UNIQUE,
	city VARCHAR(50),
	region VARCHAR(50),
	postcode VARCHAR(7),
	price INTEGER,
    posting_date DATE,
    url TEXT
);

CREATE TABLE HouseImage(
	id SERIAL PRIMARY KEY,
	address VARCHAR(50) REFERENCES house(address),
	imgUrl TEXT
);
