import {PythonShell} from "python-shell";
import {db, createHouseInfo, createHouseImage, checkHouseExist, getExistHouse} from "./dbHandler.js"


async function scheduleHouseScraping() {
    let data;

    await PythonShell.run('./services/rentalscraper.py', null).then(messages => {

    data = JSON.parse(messages[0])}); 
    
    if (data.length == null) {
        return {};
    }
    var existedRent = [];
    var dbError = [];
   
    for(let i in data) {
        let isExisted = await checkHouseExist(data[i].name);

        if(!isExisted) {
            try {
                await createHouseInfo(data[i]);
            } catch (err){
                dbError.push(err);
            }
            for (let j in data[i].imgUrl) {
                try {
                    await createHouseImage(data[i].name, data[i].imgUrl[j]);
                } catch (err) {
                    dbError.push(err);
                }
            }
        } else {
            var existedData = await getExistHouse(data[i].name);
            existedRent.push(existedData);
        }    
    }
    // await db.end();
    
    // if (existedRent.length) {
    //     console.log('Already have in DB:');
    //     console.log(existedRent);
    // } 

    if (dbError.length) {
        console.log('Error:');
        console.log(dbError);
    }
}

export default scheduleHouseScraping;
