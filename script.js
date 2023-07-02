var slideCounter = 0;
// import Chart
var tripName = document.getElementsByClassName("trip-name")[0].value;
let eventsData = new Array();
const eventsList = [];
var editStatus = 0;
let paidData = new Array();
let toPayData = new Array();
var participantsList = [];
eventsList.forEach(() => {
  var row = [];
  participantsList.forEach(() => {
    row.push(0);
  });
  eventsData.push(row);
  paidData.push(row)
  toPayData.push(row)
});
window.addEventListener("load", (event) => {
  fetchParticipants();
  fetchEvents();
  fetchEventData();
  fetchPaidData();
  fetchToPaidData();
  console.log("page is fully loaded");
});
function updatePList() {
  var addedPList = document.getElementsByClassName("addedp-list")[0];
  addedPList.innerHTML = "";
  participantsList.forEach((parName) => {
    var pBox = document.createElement("div");
    pBox.classList.add("added-p");
    pBox.innerHTML = `
        <div class="addedp-name">${parName}</div>
        <i style="font-size:35px" class="fa newp-remove">&#xf146;</i>`;
    addedPList.append(pBox);
    pBox
      .getElementsByClassName("newp-remove")[0]
      .addEventListener("click", (event) => {
        removeFromPList(event);
      });
  });
}
// const createNewBtn = document.querySelector(".createNew");
// createEventBtn.addEventListener("click", createNew());
// const eventPFinishBtn=document.querySelector("")
// const bgWelcome = document.querySelector(".bg-welcome");
// const getStarted = document.querySelector(".getStarted");
const editEventBtn = document.querySelector(".edit-events");
const addedPList = document.getElementsByClassName("addedp-list")[0];
const searchBtn = document.querySelector(".search-btn");
const refreshBtn = document.querySelector(".refresh-btn");
const createEventBtn = document.querySelector(".create-event");
const participantsPageDone = document.querySelector(".finishPpage");
const editParticipants = document.querySelector(".delete-edit_participant");

var isAdvanced = 0;
var closePopUpBtn = document.querySelector(".close-popup-btn")
// closePopUpBtn.addEventListener("click", (event) => { closePopUp(event) })
participantsPageDone.addEventListener("click", () => {
  editP(0);
});
editParticipants.addEventListener("click", () => {
  // const closePopUpBtn=document.querySelector(".close-popup-btn")
  // closePopUpBtn.addEventListener("click",(event)=>{closePopUp(event)})
  editP(1);
});
createEventBtn.addEventListener("click", createEvent);
// getStarted.addEventListener("click", closePop);
refreshBtn.addEventListener("click", displayEvents);
searchBtn.addEventListener("click", searchFilter);
function closePopUp(event) {
  var buttonClicked = event.target;
  var popup = buttonClicked.parentElement.parentElement;
  popup.style.display = 'none';
}
function closePop() {
  // bgWelcome.classList.add("remove");
}
displayEvents();
const addPbtn = document.querySelector(".newp-add");
addPbtn.addEventListener("click", addPToList);
function addPToList() {
  var inputField = document.querySelector(".newp-name");
  var parName = inputField.value;
  inputField.value = "";
  if (parName != "" && !participantsList.includes(parName)) {
    participantsList.push(parName);
    updatePList();
  }
  var index = 0;
  eventsData.forEach(() => {
    eventsData[index].push("0");
    paidData[index].push("0");
    toPayData[index].push("0");
    index++;
  });
}
function removeFromPList(event) {
  var buttonClicked = event.target;
  var name =
    buttonClicked.parentElement.getElementsByClassName("addedp-name")[0]
      .innerHTML;
  var pos = participantsList.indexOf(name);
  var isInvolved = 0,
    index = 0;
  eventsData.forEach(() => {
    if (eventsData[index][pos] != "0") {
      isInvolved = 1;
    }
    index++;
  });
  if (isInvolved) {
    editP(0);
    document.querySelector(".delete-p-page").style.display = "flex";
    document
      .getElementsByClassName("p-delete-continue")[0]
      .addEventListener("click", () => {
        document.querySelector(".delete-p-page").style.display = "none";
      });
  } else {
    buttonClicked.parentElement.remove();
    var index = 0;
    eventsData.forEach(() => {
      eventsData[index].splice(pos, 1);
      paidData[index].splice(pos, 1);
      toPayData[index].splice(pos, 1);
      index++;
    });
    participantsList.splice(pos, 1);
  }
}
function displayEvents() {
  var eventList = document.getElementsByClassName("event-list")[0];
  var notFound = document.getElementsByClassName("not-found")[0];
  notFound.classList.add("nothing-close");
  eventList.innerHTML = "";
  eventsList.forEach((value) => {
    var event = document.createElement("button");
    event.classList.add("event");
    event.setAttribute("id", `${value}`);
    event.setAttribute("onclick", `displayEventResults('${value}')`);
    event.innerHTML = `<p class="event-p">${value}</p>`;
    eventList.append(event);
  });
}
function searchFilter() {
  var searchBar = document.getElementsByClassName("search-bar")[0];
  var searchWord = searchBar.value;
  if (searchWord == "") return;
  var isFound = 0;
  var searchResults = [];
  eventsList.forEach((value) => {
    let re = new RegExp(searchWord, "i");
    if (value.search(re) >= 0) {
      searchResults.push(value);
      isFound = 1;
    }
  });
  var eventList = document.getElementsByClassName("event-list")[0];
  eventList.innerHTML = "";
  searchResults.forEach((value) => {
    var event = document.createElement("div");
    event.classList.add("event");
    event.innerHTML = `<p>${value}</p>`;
    eventList.append(event);
  });
  var notFound = document.getElementsByClassName("not-found")[0];
  if (!isFound) {
    notFound.classList.remove("nothing-close");
  }
  searchBar.value = "";
}

// =========================================================

/*
 *  author : nimaiparsa
 *  dont touch my gurl
 */

// to display the participants in the popup
function displayParticipants(n) {
  let container = document.querySelector(".event-participants-container-" + n);
  container.innerHTML = "";
  for (let name of participantsList) {
    container.innerHTML += `<div class="event-participant" id="${name}">
        <input type="checkbox" class="participant-checkbox" id="${name + 3 + n
      }">
        <h3 class="event-participant-name">${name}</h3>
        <div class="participant-contribution-container">
        <input class="participant-contribution" id="${name + n}">   
        </div>
        </div>`;
  }
}
// to check if func is working

// function to display advanced settings
function toggleSettings(n) {
  let text = document.getElementById("settings" + n);
  let inputs = document.querySelectorAll(".participant-contribution");
  if (text.style.color != "green") {
    isAdvanced = 1;
    inputs.forEach((input) => {
      input.style.display = "block";
    });
    text.style.color = "green";
  } else {
    isAdvanced = 0;
    inputs.forEach((input) => {
      input.style.display = "none";
    });
    text.style.color = "white";
  }
}

// functions to nav through popups =====

function setEventPosition() {
  slideCounter = 0;
  const popups = document.querySelectorAll(".pop-up-event");
  popups.forEach((popup, index) => (popup.style.left = `${index * 100}%`));
  popups.forEach((popup, index) => (popup.style.top = `${-index * 100}%`));
  popups.forEach((popup) => {
    popup.style.transform = `translateX(0)`;
  });
}
// setEventPosition();
function goNext() {
  const popups = document.querySelectorAll(".pop-up-event");
  if (slideCounter >= 1) {
    // slideCounter--;
    eventPageDone();
  }
  slideCounter++;
  popups.forEach((popup) => {
    popup.style.transform = `translateX(-${slideCounter * 100}%)`;
  });
  // console.log(popups);
}

function goPrev() {
  const popups = document.querySelectorAll(".pop-up-event");
  console.log("wnrered ", slideCounter)
  if (slideCounter <= 0) { console.log("here"); return };
  console.log(slideCounter)
  slideCounter--;
  popups.forEach((popup) => {
    popup.style.transform = `translateX(-${slideCounter * 100}%)`;
  });
  // console.log(popups);
}

// work in progress
function updateBtns() { }
// ==============================================================================

function editP(flag) {
  var participantsPage = document.getElementsByClassName(
    "participants_n_tripname"
  )[0];
  if (flag == 1) {
    participantsPage.style.display = "flex";
  } else {
    if (participantsList.length < 2) {
      alert("Atleast two participants are required!")
      return;
    }
    // Create an XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Prepare the data to be sent
    const data = new FormData();
    data.append("participantsList", JSON.stringify(participantsList));

    // Set up the AJAX request
    xhr.open("POST", "participants.php", true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log(xhr.responseText); // Handle the response from PHP
      }
    };

    // Send the request
    xhr.send(data);

    participantsPage.style.display = "none";
    if (eventsList.length > 0) {
      updateEventsDb();
    }
    // added by nimai
    updateNet();
  }
}

function createEvent() {
  var createEventPage = document.getElementsByClassName("create-event-page")[0];
  createEventPage.style.display = "flex";
  setEventPosition();
  displayParticipants(1);
  displayParticipants(2);
}

function fetchParticipants() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "fetch_participants.php", true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var entries = JSON.parse(this.responseText);
        // console.log(entries instanceof Array);
        displayParticipantEntries(entries);
        updatePList();
        if (participantsList.length == 0) {
          editP(1);
        }
      } else {
        console.error("Fetching paricipants error!");
      }
    }
  };
  updateNet(); // added by nimai
}

function fetchEvents() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "fetch_events.php", true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var entries = JSON.parse(this.responseText);
        displayEventEntries(entries);
        displayEvents();
      } else {
        console.error("Fetching events error!");
      }
    }
  };
  updateNet(); // added by nimai
}

function fetchEventData() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "fetch_eventData.php", true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var entries = JSON.parse(this.responseText);
        displayEventDataEntries(entries);
      } else {
        console.error("Fetching eventsData error!");
      }
    }
  };
  updateNet(); // added by nimai
}

function fetchPaidData() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "fetch_paidData.php", true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var entries = JSON.parse(this.responseText);
        displayPaidDataEntries(entries);
      } else {
        console.error("Fetching paidData error!");
      }
    }
  };
}

function fetchToPaidData() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "fetch_toPayData.php", true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var entries = JSON.parse(this.responseText);
        displayToPayDataEntries(entries);
      } else {
        console.error("Fetching toPayData error!");
      }
    }
  };
}

function displayToPayDataEntries(entries) {
  entries.forEach(function (entry) {
    toPayData.push(Object.values(entry));
  });
}

function displayPaidDataEntries(entries) {
  entries.forEach(function (entry) {
    paidData.push(Object.values(entry));
  });
}

function displayEventDataEntries(entries) {
  entries.forEach(function (entry) {
    eventsData.push(Object.values(entry));
  });
}

function displayEventEntries(entries) {
  entries.forEach(function (entry) {
    eventsList.push(entry);
  });
}

// Function to display entries on the page
function displayParticipantEntries(entries) {
  entries.forEach(function (entry) {
    participantsList.push(entry);
  });
}

function eventPageDone() {
  var eventName = document.getElementsByClassName("event-name-input")[0].value;
  var totalAmount = Number(
    document.getElementsByClassName("event-amount-input")[0].value
  );
  if (eventName == "") {
    alert("You haven't entered event name or event name already used.!")
    // slideCounter++;
    goPrev()
    return;
  }

  if (eventsList.indexOf(eventName) != -1) {
    let index = eventsList.indexOf(eventName)
    eventsList.splice(index, 1);
    eventsData.splice(index, 1);
    paidData.splice(index, 1);
    toPayData.splice(index, 1);
  }
  if (isNaN(totalAmount) || totalAmount == 0) {
    alert("You entered Invalid amount!!");
    // slideCounter++;
    goPrev()
    return;
  }

  // to validate paid amounts //

  // getting the list of participants involved:
  var paidParticipants = [];
  var toPayParticipants = [];
  participantsList.forEach((name) => {
    if (document.getElementById(`${name + 3 + 1}`).checked) {
      paidParticipants.push(name);
    }
    if (document.getElementById(`${name + 3 + 2}`).checked) {
      toPayParticipants.push(name);
    }
  });

  if (isAdvanced) {


    //checking validity
    var paidSum = 0,
      toPaySum = 0;
    paidParticipants.forEach((name) => {
      var paidAmount = Number(document.getElementById(`${name + 1}`).value);
      if (isNaN(paidAmount)) {
        alert("Invalid amount entered for" + `${name}` + "!!");
        return;
      }
      paidSum += paidAmount;
    });
    toPayParticipants.forEach((name) => {
      var toPayAmount = Number(document.getElementById(`${name + 2}`).value);
      if (isNaN(toPayAmount)) {
        alert("Invalid amount entered for" + `${name}` + "!!");
        return;
      }
      toPaySum += toPayAmount;
    });
    if (paidSum != totalAmount) {
      goPrev()
      alert("The paid Amount doesn't sum up.Please recheck the values!!");
      return;
    }
    if (toPaySum != totalAmount) {
      alert("The to pay Amount doesn't sum up.Please recheck the values!!");
      return;
    }
    // will proceed into entering into eventsData after 
    // initialising and entering into events list ***should be done only if it is valid;
    eventsList.push(eventName);
    displayEvents();
    let row = new Array();
    participantsList.forEach(() => {
      row.push(0);
    });
    eventsData.push(row);
    paidData.push(row.slice()); // create a copy of row
    toPayData.push(row.slice()); // create a copy of row
    paidParticipants.forEach((name) => {
      var paidAmount = Number(document.getElementById(`${name + 1}`).value);
      eventsData[eventsList.indexOf(eventName)][participantsList.indexOf(name)] += paidAmount
      paidData[eventsList.indexOf(eventName)][participantsList.indexOf(name)] += paidAmount
    });
    toPayParticipants.forEach((name) => {
      var toPayAmount = Number(document.getElementById(`${name + 2}`).value);
      eventsData[eventsList.indexOf(eventName)][participantsList.indexOf(name)] -= toPayAmount
      toPayData[eventsList.indexOf(eventName)][participantsList.indexOf(name)] += toPayAmount
    });
    toggleSettings(1)
  } else {
    //initislising and entering into events list ***should be done only if it is valid;
    eventsList.push(eventName);
    displayEvents();
    let index = 0;
    let row = new Array();
    participantsList.forEach(() => {
      row.push(0);
    });
    eventsData.push(row);
    paidData.push(row.slice()); // create a copy of row
    toPayData.push(row.slice()); // create a copy of row
    console.log(paidData)

    var indAmountPaid = totalAmount / paidParticipants.length;
    var indAmounttoPay = totalAmount / toPayParticipants.length;
    paidParticipants.forEach((name) => {
      eventsData[eventsList.indexOf(eventName)][participantsList.indexOf(name)] += indAmountPaid;
      paidData[eventsList.indexOf(eventName)][participantsList.indexOf(name)] += indAmountPaid
    });
    toPayParticipants.forEach((name) => {
      eventsData[eventsList.indexOf(eventName)][participantsList.indexOf(name)] -= indAmounttoPay;
      toPayData[eventsList.indexOf(eventName)][participantsList.indexOf(name)] += indAmounttoPay
    });
  }

  var createEventPage = document.getElementsByClassName("create-event-page")[0];
  createEventPage.style.display = "none";
  document.getElementsByClassName("event-name-input")[0].value = "";
  document.getElementsByClassName("event-amount-input")[0].value = "";
  slideCounter++;
  updateEventsDb();

}
function updateEventsDb() {
  //Database for events
  const xhr = new XMLHttpRequest();
  const dataEventName = new FormData();
  dataEventName.append("eventsList", JSON.stringify(eventsList));
  xhr.open("POST", "events.php", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log(xhr.responseText); // Handle the response from PHP
    }
  };
  xhr.send(dataEventName);

  //Database for eventsData
  const req = new XMLHttpRequest();
  const dataEventData = new FormData();
  dataEventData.append("eventsData", JSON.stringify(eventsData));
  req.open("POST", "eventsData.php", true);
  req.onload = function () {
    if (req.status === 200) {
      console.log(req.responseText); // Handle the response from PHP
    }
  };
  req.send(dataEventData);

  //Database for paidData
  const request = new XMLHttpRequest();
  const dataPaidData = new FormData();
  dataPaidData.append("paidData", JSON.stringify(paidData));
  request.open("POST", "paidData.php", true);
  request.onload = function () {
    if (request.status === 200) {
      console.log(request.responseText); // Handle the response from PHP
    }
  };
  request.send(dataPaidData);

  //Database for toPayData
  const r = new XMLHttpRequest();
  const dataToPayData = new FormData();
  dataToPayData.append("toPayData", JSON.stringify(toPayData));
  r.open("POST", "toPayData.php", true);
  r.onload = function () {
    if (r.status === 200) {
      console.log(r.responseText); // Handle the response from PHP
    }
  };
  r.send(dataToPayData);

  updateNet();
}

// functions to display event-wise results and final results
// =========================================================

/*
 *  author : nimaiparsa
 *  dont touch my gurl
 */

var mychart;
var currentEvent = '';
function displayEventResults(event) {
  updateNet();
  currentEvent = event;

  const barColors = [];
  const barValues = [];
  const barData = [];
  let index = eventsList.indexOf(event);
  for (let i = 0; i < participantsList.length; i++) {
    if (eventsData[index][i] > 0) {
      barValues.push(participantsList[i]);
      barColors.push('#24FF00');
      barData.push(eventsData[index][i]);
    } else if (eventsData[index][i] < 0) {
      barValues.push(participantsList[i]);
      barColors.push('#D80000');
      barData.push(eventsData[index][i]);
    }
  }

  const ctx = document.getElementById('myChartBar');

  if (mychart != null)
    mychart.destroy();

  mychart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: barValues,
      datasets: [{
        label: 'Net',
        data: barData,
        borderWidth: 1,
        backgroundColor: barColors
        // barWidth: 0.1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  const spent = document.getElementsByClassName("display-spent")[0];
  spent.innerHTML = "";
  let temp = document.createElement('div');
  temp.classList.add('spent-body');
  spent.innerHTML += ` <div class="spent-head">
  <h1 class="spent-name">Participant</h1>
  <h1 class="spent-paid">Paid</h1>
  <h1 class="spent-to-pay">To be Paid</h1>
  </div>
  `;

  for (let member = 0; member < participantsList.length; member++) {
    temp.innerHTML += `<div class="event-result">
    <h1 class="spent-name">${participantsList[member]}</h1>
    <h1 class="spent-paid">${paidData[index][member]}</h1>
    <h1 class="spent-to-pay">${toPayData[index][member]}</h1>
    </div>`
  }
  spent.append(temp);

  // const editEventBtn = document.querySelector(".edit-events");
  // editEventBtn.addEventListener("click", (eventList.indexOf(event))=>{editEvents(index)});
}

function showResults() {
  const totalNet = Array(participantsList.length);
  for (let member = 0; member < participantsList.length; member++) {
    totalNet[member] = 0;
    for (let event = 0; event < eventsList.length; event++)
      totalNet[member] += Number(eventsData[event][member]);
  }

  let positive = new Array(),
    negative = new Array();
  for (let i = 0; i < totalNet.length; i++) {
    if (totalNet[i] > 0) positive.push([totalNet[i], i]);
    else if (totalNet[i] < 0) negative.push([totalNet[i], i]);
  }
  // return
  const pay = new Array(participantsList.length);
  const receive = new Array(participantsList.length);
  for (let i = 0; i < participantsList.length; i++) {
    pay[i] = new Array();
    receive[i] = new Array();
  }

  while (negative.length && positive.length) {

    if (positive[positive.length - 1][0] > -negative[negative.length - 1][0]) {
      pay[negative[negative.length - 1][1]].push([
        -negative[negative.length - 1][0],
        positive[positive.length - 1][1],
      ]);
      receive[positive[positive.length - 1][1]].push([
        -negative[negative.length - 1][0],
        negative[negative.length - 1][1],
      ]);
      positive[positive.length - 1][0] += negative[negative.length - 1][0];
      negative.pop();
      continue;
    } else if (
      positive[positive.length - 1][0] == -negative[negative.length - 1][0]
    ) {
      pay[negative[negative.length - 1][1]].push([
        -negative[negative.length - 1][0],
        positive[positive.length - 1][1],
      ]);
      receive[positive[positive.length - 1][1]].push([
        -negative[negative.length - 1][0],
        negative[negative.length - 1][1],
      ]);

      positive.pop();
      negative.pop();
      continue;
    }
    pay[negative[negative.length - 1][1]].push([
      positive[positive.length - 1][0],
      positive[positive.length - 1][1],
    ]);
    receive[positive[positive.length - 1][1]].push([
      positive[positive.length - 1][0],
      negative[negative.length - 1][1],
    ]);
    negative[negative.length - 1][0] += positive[positive.length - 1][0];
    positive.pop();
  }

  const spent = document.getElementsByClassName("display-spent")[0];
  spent.innerHTML = '';

  for (let i = 0; i < pay.length; i++) {
    if (pay[i].length == 0) continue;

    let parDiv = document.createElement('div');
    parDiv.classList.add('final-parent');
    parDiv.innerHTML += `<input type="checkbox" name="example_accordion" id="${participantsList[i]}id" class="accordion__input">
    <label for="${participantsList[i]}id" class="accordion__label">${participantsList[i]} <span class="negative-result">pays ${-totalNet[i]}</span></label>`;

    let temp = '';
    temp += `<div class="accordion__content">`
    for (let j of pay[i]) {
      temp += `<p>${participantsList[i]}
      <span class="negative-result">pays ${j[0]}</span>
      to ${participantsList[j[1]]}
      </p>`
    }
    temp.innerHTML += `</div>`;
    parDiv.innerHTML += temp;
    spent.append(parDiv);
  }
  // console.log(spent.innerHTML);

  for (let i = 0; i < receive.length; i++) {
    if (receive[i].length == 0) continue;

    let parDiv = document.createElement('div');
    parDiv.classList.add('final-parent');
    parDiv.innerHTML += `<input type="checkbox" name="example_accordion" id="${participantsList[i]}id" class="accordion__input">
    <label for="${participantsList[i]}id" class="accordion__label">${participantsList[i]} <span class="positive-result">receives ${totalNet[i]}</span></label>`;

    let temp = '';
    temp += `<div class="accordion__content">`
    for (let j of receive[i]) {
      temp += `<p>${participantsList[i]}
      <span class="positive-result">receive ${j[0]}</span>
      from ${participantsList[j[1]]}
      </p>`
    }
    temp.innerHTML += `</div>`;
    parDiv.innerHTML += temp;
    spent.append(parDiv);
  }

  const barColors = [];
  const barValues = [];
  const barData = [];

  for (let i = 0; i < participantsList.length; i++) {
    if (totalNet[i] > 0) {
      barValues.push(participantsList[i]);
      barColors.push('#24FF00');
      barData.push(totalNet[i]);
    } else if (totalNet[i] < 0) {
      barValues.push(participantsList[i]);
      barColors.push('#D80000');
      barData.push(totalNet[i]);
    }
  }

  const ctx = document.getElementById('myChartBar');

  if (mychart != null)
    mychart.destroy();

  mychart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: barValues,
      datasets: [{
        label: 'Net',
        data: barData,
        borderWidth: 1,
        backgroundColor: barColors
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

var mypie;
function updateNet() {
  const net = document.getElementsByClassName('display-net')[0];
  console.log(participantsList.length)
  if (participantsList.length == 0) {
    return;
  }

  net.innerHTML = "";
  net.innerHTML += `
    <div class="net-head">
      <h1>Participant</h1>
      <h1>Net</h1>
    </div>`;

  const temp = document.createElement('div');
  temp.classList.add('net-body');
  if (eventsData.length == 0) {
    participantsList.forEach((value) => {
      temp.innerHTML += `<div class="event-result">
      <h1 class="event-result-text">${value}</h1>
      <h1 class="event-result-text positive-result">+0</h1>
      </div>`;
    });

    net.append(temp);
    return;


  }
  const totalNet = Array(participantsList.length);
  for (let member = 0; member < participantsList.length; member++) {
    totalNet[member] = 0;
    for (let event = 0; event < eventsList.length; event++)
      totalNet[member] += Number(eventsData[event][member]);
  }

  participantsList.forEach((value, index) => {
    if (totalNet[index] >= 0) {
      temp.innerHTML += `<div class="event-result">
      <h1 class="event-result-text">${value}</h1>
      <h1 class="event-result-text positive-result">+${totalNet[index]}</h1>
      </div>`;
    }
    else {
      temp.innerHTML += `<div class="event-result">
      <h1 class="event-result-text">${value}</h1>
      <h1 class="event-result-text negative-result">${totalNet[index]}</h1>
      </div>`;
    }
  });

  net.append(temp);

  const eventDiv = document.querySelector('#myChartPie').getContext("2d");
  if (eventsList.length == 0) return;

  const temp2 = document.createElement('div');
  temp2.classList.add('net-body');

  const eventNet = Array(eventsList.length);
  eventsList.forEach((value, index) => {
    eventNet[index] = 0;
    paidData[index].forEach((val) => {
      eventNet[index] += val;
    });
  });

  if (mypie != null)
    mypie.destroy();

  mypie = new Chart(eventDiv, {
    type: 'polarArea',
    data: {
      labels: eventsList,
      datasets: [{
        label: 'Events',
        data: eventNet,
      }]
    },
    options: {

    }
  });
}

function dropDownResult(id) {
  const childContainer = document.getElementById(id);
  if (childContainer.style.display == "none")
    childContainer.style.display = "block";
  else childContainer.style.display = "none";
}

// =========================================================

function editEvents() {
  //call createEvent()
  //set all values and check boxes and call 
  //two ways
  //1)modifying eventPage done such that it wont create another row and add again into eventsList
  //2)deleting this event and calling eventPageDone normally
  // console.log(index);
  if (currentEvent == '') {
    alert('Select an Event first')
    return;
  };
  editStatus = 1
  createEvent();
  console.log(currentEvent);
  var eventName = document.getElementsByClassName("event-name-input")[0];
  eventName.value = currentEvent;
  let index = 0, totalAmount = 0;
  toggleSettings(1)
  paidData[eventsList.indexOf(currentEvent)].forEach((value) => {
    if (value != '0') {
      var name = participantsList[index];
      document.getElementById(`${name + 3 + 1}`).checked = true;
      document.getElementById(`${name + 1}`).value = value;
      totalAmount += Number(value)
    }
    index++;
  })
  index = 0;
  toPayData[eventsList.indexOf(currentEvent)].forEach((value) => {
    if (value != '0') {
      var name = participantsList[index];
      document.getElementById(`${name + 3 + 2}`).checked = true;
      document.getElementById(`${name + 2}`).value = value;
    }
    index++;
  })
  index = 0;
  editStatus = 0;
  document.getElementsByClassName("event-amount-input")[0].value = totalAmount;
  // console.log(eventsList[index],eventName)
}

function createNew() {
  let text = `Do you want to discard the present trip and create a new Trip!!`;
  if (confirm(text) == true) {
    const xhr = new XMLHttpRequest();
    const data = new FormData();
    data.append("delete", JSON.stringify("delete"))
    xhr.open("POST", "clearDb.php", true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
      }
    };
    xhr.send(data);
  }
  location.reload();
}