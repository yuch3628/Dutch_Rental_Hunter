import dotenv from "dotenv";
dotenv.config();
import pg from "pg";

export const db = new pg.Pool({
    user: process.env.POSTGRES_USERNAME,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

export async function checkHouseExist(house) {
    let isExisted = await db.query("SELECT EXISTS(SELECT 1 FROM house WHERE address = $1);", [house]);
    return isExisted.rows[0].exists;
}

export async function createHouseInfo(houseData) {
    return await db.query("INSERT INTO house(address, city, region, postcode, price, url) VALUES ($1, $2, $3, $4, $5, $6);", [houseData.name, houseData.city, houseData.region, houseData.postcode, houseData.price, houseData.url]);
}

export async function createHouseImage(imgName, imgUrl) {
    return await db.query("INSERT INTO houseimage(address, imgurl) VALUES ($1, $2);", [imgName, imgUrl]);
}

export async function getExistHouse(house){
    var existedData = await db.query('SELECT * FROM house WHERE address = ($1);',[house]);

    return existedData.rows;
}

export async function getHouseInfoByDate(date) {
    let house = await db.query("SELECT * FROM house WHERE posting_date = ($1);",[date]);
    return house.rows;
}

export async function getHouseInfoByDateRange(date) {
    let house = await db.query("SELECT * FROM house WHERE posting_date >= ($1)",[date]);
    return house.rows;
}