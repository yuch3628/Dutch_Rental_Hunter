module.exports = {
    getHouseScraping : () => {
        let {PythonShell} = require('python-shell');
        PythonShell.run('./service/rentalscraper.py', null).then(messages=>{
            console.log('result:%j',messages);
        });
    }
} 


// module.exports = getHouseScraping;