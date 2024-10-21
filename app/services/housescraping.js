import {PythonShell} from "python-shell";
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const db = new pg.Client({
    user: process.env.POSTGRES_USERNAME,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT
  });


async function scheduleHouseScraping() {
    let data;

    await PythonShell.run('./services/rentalscraper.py', null).then(messages => {
    data = JSON.parse(messages[0])}); 

    var existedRent = [];
    var dbError = [];

    await db.connect();
   
    for(let i in data) {
        let isExisted = await db.query("SELECT EXISTS(SELECT 1 FROM house WHERE address = $1);", [data[i].name]);
        if(!isExisted.rows[0].exists) {
            try {
                await db.query("INSERT INTO house(address, city, region, postcode, price) VALUES ($1, $2, $3, $4, $5);", [data[i].name, data[i].city, data[i].region, data[i].postcode, data[i].price]);
            } catch (err){
                dbError.push(err);
            }
            for (let j in data[i].imgUrl) {
                try {
                    await db.query("INSERT INTO houseimage(address, imgurl) VALUES ($1, $2);", [data[i].name, data[i].imgUrl[j]]);
                } catch (err) {
                    dbError.push(err);
                }
            
            }
        } else {
            var existedData = await db.query('SELECT address, city, region, postcode, price, posting_date FROM house WHERE address = ($1);',[(data[i].name)]);
            existedRent.push(existedData.rows[0]);

        }    
    }
    await db.end();
    
    if (existedRent.length) {
        console.log('Already have in DB:');
        console.log(existedRent);
    } 

    if (dbError.length) {
        console.log('Error:');
        console.log(dbError);
    }
}

export default scheduleHouseScraping;
