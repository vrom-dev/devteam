async function getCurrentTime() {
  try {
    const ts = Date.now();
    const date = new Date(ts);
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const day = date.getDate();
    const seconds = date.getSeconds();
    const month = date.getMonth() + 1;
    const pretty = `${hour}:${minutes}:${seconds} ${day}-${month}-${year}`;
    const easyDate = {
      pretty,
      hour,
      minutes,
      day,
      month
    }
    return easyDate;
  } catch (err) {
    return err.message;
  }
}

module.exports = getCurrentTime;
