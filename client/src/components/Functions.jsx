// for am/pm formatting
export const formatTime = (time) => {
  if (time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  } else return null;
};

// for am/pm formatting with date
export const formatTimeDate = (time) => {
  if (time) {
    // Removing the date from the time string
    var stringArray = time.split(/(\s+)/);
    time = stringArray[2];

    // Check correct time format and split into components
    // time = time
    //   .toString()
    //   .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    // if (time.length > 1) {
    //   // If time format correct
    //   time = time.slice(1); // Remove full string match value
    //   time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
    //   time[0] = +time[0] % 12 || 12; // Adjust hours
    // }
    // return time.join(""); // return adjusted time or original string
    time = time.slice(0, -3);
    return time;
  } else return null;
};

export const getMonthYear = (date) => {
  var dateObj = new Date(date);

  var monthName = new Array(11);
  monthName[0] = "January";
  monthName[1] = "February";
  monthName[2] = "March";
  monthName[3] = "April";
  monthName[4] = "May";
  monthName[5] = "June";
  monthName[6] = "July";
  monthName[7] = "August";
  monthName[8] = "September";
  monthName[9] = "October";
  monthName[10] = "November";
  monthName[11] = "December";
  var month = monthName[dateObj.getMonth()]; //months from 1-12
  var day = dateObj.getDate();
  var year = dateObj.getFullYear();

  return `${month} ${year}`;
};

export const removeEmpty = (obj) => {
  Object.keys(obj).forEach((k) => !obj[k] && obj[k] !== delete obj[k]);
  return obj;
};

export const formatDate = (date) => {
  if (date) {
    return date.slice(0, 10);
  } else return null;
};

export const getDay = (date) => {
  const d = new Date(date);
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  var n = weekday[d.getDay()];
  return n;
};

export const getLastDay = (date) => {
  var now = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);
  var today = now.getFullYear() + "-" + month + "-" + day;
  return today;
};

export const getFirstDay = (date) => {
  var now = new Date(date.getFullYear(), date.getMonth(), 1);
  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);
  var today = now.getFullYear() + "-" + month + "-" + day;
  return today;
};

export const joinTime = (hour, minute) => {
  const d = new Date();
  d.setHours(hour);
  d.setMinutes(minute);
  let time = d.toLocaleTimeString();

  return time;
};

export const currentDate = () => {
  var now = new Date();
  now.setDate(now.getDate());
  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);
  var today = now.getFullYear() + "-" + month + "-" + day;

  return today;
};

export const tomorrowDate = () => {
  var now = new Date();
  now.setDate(now.getDate() + 1);
  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);
  var tomorrow = now.getFullYear() + "-" + month + "-" + day;

  return tomorrow;
};

export const getNextDay = (date) => {
  var now = new Date(date);
  now.setDate(now.getDate() + 1);
  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);
  var nextDay = now.getFullYear() + "-" + month + "-" + day;

  return nextDay;
};

export const statusStyling = (status) => {
  if (status === "Present")
    return {
      border: "1px solid #448B43",
      borderRadius: "5px",
      color: "#448B43",
      width: "6rem",
      padding: "3px",
      textAlign: "center",
    };
  else if (status === "Absent")
    return {
      border: "1px solid #8B4343",
      borderRadius: "5px",
      color: "#8B4343",
      width: "6rem",
      padding: "3px",
      textAlign: "center",
    };
  else if (status === "Late")
    return {
      border: "1px solid #b53802",
      borderRadius: "5px",
      color: "#b53802",
      width: "6rem",
      padding: "3px",
      textAlign: "center",
    };
  else if (status === "WFH")
    return {
      border: "1px solid #A9AD24",
      borderRadius: "5px",
      color: "#A9AD24",
      width: "6rem",
      padding: "3px",
      textAlign: "center",
    };
  else
    return {
      color: "#A9AD24",
      width: "6rem",
      padding: "3px",
      textAlign: "center",
    };
};

export const displayFileList = (data) => {
  var sendFile = [];
  for (let i = 0; i < data.length; i++) {
    sendFile.push(data.item(i));
  }
  return sendFile;
};

export const roleStyling = (role) => {
  if (role === "admin")
    return {
      borderRadius: "5px",
      background: "#5652a1",
      color: "white",
      width: "6rem",
      padding: "3px",
      textAlign: "center",
    };
  else if (role === "supervisor")
    return {
      background: "#7CC1A8",
      borderRadius: "5px",
      color: "white",
      width: "6rem",
      padding: "3px",
      textAlign: "center",
    };
  else if (role === "employee")
    return {
      borderRadius: "5px",
      background: "#5293A1",
      color: "white",
      width: "6rem",
      padding: "3px",
      textAlign: "center",
    };
  else
    return {
      borderRadius: "5px",
      background: "#5293A1",
      color: "white",
      width: "6rem",
      padding: "3px",
      textAlign: "center",
    };
};
