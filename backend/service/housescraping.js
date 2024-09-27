
function scheduleHouseScraping(crontab) {
    let {PythonShell} = require('python-shell');
    PythonShell.run('./service/rentalscraper.py', null).then(messages=>{
        let dataList = JSON.parse(messages[0]); 
    });
}

module.exports = {scheduleHouseScraping};
