const display = document.querySelector(".displayResult");

inputKey = (result) => {
  display.value += result;
};

clearKey = () => {
  display.value = "";
};

showResult = () => {
  let x = display.value;
  if (x) {
    let y = eval(x);
    display.value = y;
  } else {
    display.value = "";
  }
};

// const calculator = document.querySelector(".calculator");

// keys.addEventListener("click", (e) => {
//   // var key = e.target
//   // var action = key.dataset.action
//   console.log("Got2:", e.target);
// });

var sw = {
  etime: null, // HTML time display
  erst: null, // HTML reset button
  ego: null, // HTML start/stop button
  init: function () {
    // (A1) GET HTML ELEMENTS
    sw.etime = document.getElementById("sw-time");
    sw.erst = document.getElementById("sw-rst");
    sw.ego = document.getElementById("sw-go");

    // (A2) ENABLE BUTTON CONTROLS
    sw.erst.addEventListener("click", sw.reset);
    sw.erst.disabled = false;
    sw.ego.addEventListener("click", sw.start);
    sw.ego.disabled = false;
  },

  // (B) TIMER ACTION
  timer: null, // timer object
  now: 0, // current elapsed time
  tick: function () {
    // (B1) CALCULATE HOURS, MINS, SECONDS
    sw.now++;
    var remain = sw.now;
    var hours = Math.floor(remain / 3600);
    remain -= hours * 3600;
    var mins = Math.floor(remain / 60);
    remain -= mins * 60;
    var secs = remain;

    // (B2) UPDATE THE DISPLAY TIMER
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (mins < 10) {
      mins = "0" + mins;
    }
    if (secs < 10) {
      secs = "0" + secs;
    }
    sw.etime.innerHTML = hours + ":" + mins + ":" + secs;
  },

  // (C) START!
  start: function () {
    sw.timer = setInterval(sw.tick, 1000);
    sw.ego.value = "Stop";
    sw.ego.removeEventListener("click", sw.start);
    sw.ego.addEventListener("click", sw.stop);
  },

  // (D) STOP
  stop: function () {
    clearInterval(sw.timer);
    sw.timer = null;
    sw.ego.value = "Start";
    sw.ego.removeEventListener("click", sw.stop);
    sw.ego.addEventListener("click", sw.start);
  },

  // (E) RESET
  reset: function () {
    if (sw.timer != null) {
      sw.stop();
    }
    sw.now = -1;
    sw.tick();
  },
};
window.addEventListener("load", sw.init);

function currentTime() {
  var date = new Date(); /* creating object of Date class */
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  var midday = "AM";
  midday = hour >= 12 ? "PM" : "AM"; /* assigning AM/PM */
  hour =
    hour == 0
      ? 12
      : hour > 12
      ? hour - 12
      : hour; /* assigning hour in 12-hour format */
  hour = updateTime(hour);
  min = updateTime(min);
  sec = updateTime(sec);
  document.getElementById("clock").innerText =
    hour +
    " : " +
    min +
    " : " +
    sec +
    " " +
    midday; /* adding time to the div */
  var t = setTimeout(currentTime, 1000); /* setting timer */
}

function updateTime(k) {
  /* appending 0 before time elements if less than 10 */
  if (k < 10) {
    return "0" + k;
  } else {
    return k;
  }
}

currentTime();

function currentDate() {
  let currentDate = new Date();
  let cDay = currentDate.getDate();
  let cMonth = currentDate.getMonth() + 1;
  let cYear = currentDate.getFullYear();
  document.getElementById("date").innerText =
    cDay + " / " + cMonth + " / " + cYear;
}

currentDate();
