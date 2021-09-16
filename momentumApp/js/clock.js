// Realtime Clock
function realtimeClock() {
  let rtClock = new Date();

  let hours = rtClock.getHours();
  let mins = rtClock.getMinutes();
  let secs = rtClock.getSeconds();

  // AM and PM
  let amPM = (hours < 12) ? "AM" : "PM";

  // Convert the hours component to 12-hour format
  hours = (hours > 12) ? hours - 12 : hours;

  // Pad the hours, minutes and seconds with leading zeros
  hours = ("0" + hours).slice(-2);
  mins = ("0" + mins).slice(-2);
  secs = ("0" + secs).slice(-2);

  // Display the clock 
  document.getElementById('clock').innerHTML =
    hours + " : " + mins + " : " + secs + " " + amPM;
  let t = setTimeout(realTimeClock, 500);
}

console.log('hello');