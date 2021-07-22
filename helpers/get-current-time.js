function getCurrentTime() {
 
    const ts = Date.now();
    const date = new Date(ts);
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const day = date.getDate();
    const seconds = date.getSeconds();
    const month = date.getMonth() + 1;
    const easyDate = `${hour}:${minutes}:${seconds} ${day}-${month}-${year}`;
    
    return easyDate;

}

module.exports = getCurrentTime;
