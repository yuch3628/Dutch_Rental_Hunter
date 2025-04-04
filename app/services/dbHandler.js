import dotenv from "dotenv";
dotenv.config();
import pg from "pg";

const MAX_RETRIES = 5;
const RETRY_DELAY = 2000; // 2 seconds

export const db = new pg.Pool(
{
    user: process.env.POSTGRES_USERNAME,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
});

export async function connectWithRetry(retries = MAX_RETRIES) {
    while (retries > 0) {
      try {
        await db.query('SELECT 1');
        console.log('Connected to PostgreSQL!');
        return;
      } catch (error) {
        retries -= 1;
        console.error(`Connection failed. Retries left: ${retries}`, error.message);
        if (retries === 0) {
          console.error('All connection retries failed.');
          process.exit(1);
        }
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      }
    }
}

export async function keepDbAlive() {
    try {
        await db.query('SELECT 1'); 
        console.log('Connection is alive');
      } catch (err) {
        console.error('Error keeping connection alive:', err);
      }
}

export async function checkHouseExist(house) {
    let isExisted = await db.query("SELECT EXISTS(SELECT 1 FROM house WHERE address = $1);", [house]);
    return isExisted.rows[0].exists;
}

export async function createHouseInfo(houseData) {
    return await db.query("INSERT INTO house(address, city, region, postcode, price, url, posting_date) VALUES ($1, $2, $3, $4, $5, $6, $7);", [houseData.name, houseData.city, houseData.region, houseData.postcode, houseData.price, houseData.url, houseData.date]);
}

export async function createHouseImage(imgName, imgUrl) {
    return await db.query("INSERT INTO houseimage(address, imgurl) VALUES ($1, $2);", [imgName, imgUrl]);
}

export async function getExistHouse(house){
    var existedData = await db.query('SELECT * FROM house WHERE address = ($1);',[house]);

    return existedData.rows;
}

export async function getHouseInfoByDate(date) {
    let house = await db.query("SELECT house.*, array_remove(array_agg(houseimage.imgurl), NULL) AS imgurls FROM house LEFT JOIN houseimage ON house.address = houseimage.address WHERE house.posting_date >= ($1) GROUP BY house.id;",[date]);
    return house.rows;
}

export async function getHouseCountByDate(date) {
    let num  = await db.query('SELECT COUNT(id) FROM house WHERE house.posting_date = ($1);',[date]);
    return num.rows[0].count;
}

export async function getHouseCountByThis30Days() {

    let num  = await db.query('SELECT COUNT(id) FROM house WHERE house.posting_date > now() - interval \'30 day\' AND house.posting_date < now() - interval \'0 day\';');

    return num.rows[0].count;
}

export async function getHouseCountByPast30Days() {

    let num  = await db.query("SELECT COUNT(id) FROM house WHERE house.posting_date > now() - interval '60 day' AND house.posting_date < now() - interval '30 day';");
    return num.rows[0].count;
}

export async function getHouseMedianInAWeek() {

    let price = await db.query("SELECT price FROM house WHERE house.posting_date > now() - interval '7 day';");

    let priceList = []; 
    for(let i in price.rows){
        priceList.push(price.rows[i].price);
    }

    return priceList;
}

export async function getPast6MonthsRentalAmount() {
    let ans = await db.query(`
    WITH months AS (
    SELECT generate_series(
        DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '6 months',
        DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '1 month',
        INTERVAL '1 month'
        ) AS month
    )
    SELECT TO_CHAR(m.month, 'MM') AS month, COALESCE(COUNT(h.posting_date), 0) AS listed
    
    FROM months m
    LEFT JOIN house h 
        ON DATE_TRUNC('month', h.posting_date) = m.month
    GROUP BY m.month
    ORDER BY m.month;`);
    return ans.rows;
}