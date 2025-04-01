export const weekday = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

export const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export function findMedian(arr) {
    arr.sort((a, b) => a - b);  
    const middleIndex = Math.floor(arr.length / 2);  
  
    if (arr.length % 2 === 0) {  
        return (arr[middleIndex - 1] + arr[middleIndex]) / 2;  
    } else {  
        return arr[middleIndex];  
    } 
}

export function amsPostCode(area, code){
    switch (true) {
        case (code < 1019):
            area.central +=1;
            break;
        case (code <= 1019):
            area.east +=1;
            break;
        case (code >= 1020 && code < 1040):
            area.north +=1;
            break;
        case (code >= 1040 && code < 1050):
            area.westpoort +=1;
            break;
        case (code >= 1050 && code < 1060):
            area.west +=1;
            break;
        case (code >= 1060 && code < 1070):
            area.newwest +=1;
            break;
        case (code >= 1070 && code < 1084):
            area.south +=1;
            break;
        case (code >= 1086 && code < 1100):
            area.east +=1;
            break;
        case (code >= 1100 && code < 1110):
            area.southeast +=1;
            break;
        default:
            area.others +=1;
            break;
    }
}

export function monthGrowth(partial, total){
    let growth = Math.round((partial)/total *100) - 100;
    return growth + "%";
}