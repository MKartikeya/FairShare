var participantsList = [];
fetchParticipants();
function updatePList() {
    console.log(participantsList)
    participantsList.forEach((parName) => {

        var pBox = document.createElement("div");
        pBox.classList.add('added-p');
        pBox.innerHTML = `
        <div class="addedp-name">${parName}</div>
        <i style="font-size:24px " class="fa newp-remove" id="reomveAlice">&#xf068;</i>`;
        addedPList.append(pBox)
        console.log(addedPList)
        pBox.getElementsByClassName('newp-remove')[0].addEventListener('click', (event) => {
            removeFromPList(event);
            var index = participantsList.indexOf(parName)
            if (index >= 0) {
                console.log("yess");
                participantsList.splice(index, 1);
            }
        })
    })
}
// const eventPFinishBtn=document.querySelector("")
const bgWelcome = document.querySelector(".bg-welcome");
const getStarted = document.querySelector(".getStarted");
const addedPList = document.getElementsByClassName("addedp-list")[0];
const searchBtn = document.querySelector(".search-btn")
const refreshBtn = document.querySelector(".refresh-btn")
const createEventBtn = document.querySelector(".create-event")
const participantsPageDone = document.querySelector(".finishPpage")
const editParticipants = document.querySelector(".delete-edit_participant")
var isAdvanced = 0;
participantsPageDone.addEventListener("click", () => {
    editP(0)
});
editParticipants.addEventListener("click", () => {
    editP(1)
})
createEventBtn.addEventListener("click", createEvent)
getStarted.addEventListener("click", closePop)
refreshBtn.addEventListener("click", displayEvents)
searchBtn.addEventListener("click", searchFilter)

const eventsList = [];
fetchEvents();

function closePop() {
    bgWelcome.classList.add("remove");
}
const aliceRemove = document.querySelector("#reomveAlice");
const bobRemove = document.querySelector("#reomveBob");
aliceRemove.addEventListener("click", (event) => {
    removeFromPList(event);
})
bobRemove.addEventListener("click", (event) => {
    removeFromPList(event);
}
)

displayEvents();
const addPbtn = document.querySelector('.newp-add')
addPbtn.addEventListener("click", addPToList);
function addPToList() {
    var inputField = document.querySelector(".newp-name")
    var parName = inputField.value;
    inputField.value = "";
    var pBox = document.createElement("div")
    pBox.classList.add('added-p');
    if (parName != "" && !participantsList.includes(parName)) {
        participantsList.push(parName);
        console.log(participantsList);
        pBox.innerHTML = `
        <div class="addedp-name">${parName}</div>
        <i style="font-size:24px " class="fa newp-remove" id="reomveAlice">&#xf068;</i>`;
        addedPList.append(pBox)
        console.log(addedPList)
        pBox.getElementsByClassName('newp-remove')[0].addEventListener('click', (event) => {
            removeFromPList(event);
            var index = participantsList.indexOf(parName)
            if (index >= 0) {
                console.log("yess");
                participantsList.splice(index, 1);
            }
        })
    }
}
function removeFromPList(event) {
    var buttonClicked = event.target;
    var name = buttonClicked.parentElement.getElementsByClassName("addedp-name")[0].innerHTML;
    var pos = participantsList.indexOf(name);
    var isInvolved = 0, index = 0;
    eventsData.forEach(() => {
        if (eventsData[index][pos] != 0) { isInvolved = 1; }
        index++;
    })
    if (isInvolved) {
        editP(0)
        document.querySelector(".delete-p-page").style.display = 'flex';
        document.getElementsByClassName("p-delete-continue")[0].addEventListener("click", () => { document.querySelector(".delete-p-page").style.display = 'none'; })
    }
    else { buttonClicked.parentElement.remove() }
}
function displayEvents() {
    var eventList = document.getElementsByClassName("event-list")[0];
    var notFound = document.getElementsByClassName("not-found")[0];
    notFound.classList.add("nothing-close")
    eventList.innerHTML = ""
    eventsList.forEach((value) => {
        var event = document.createElement("button");
        event.classList.add("event");
        event.setAttribute('id', `${value}`);
        event.setAttribute('onclick', `displayEventResults('${value}')`);
        event.innerHTML = `<p class="event-p">${value}</p>`
        eventList.append(event)
    })
}
function searchFilter() {
    var searchBar = document.getElementsByClassName("search-bar")[0];
    var searchWord = searchBar.value
    if (searchWord == "") return;
    var isFound = 0
    var searchResults = []
    eventsList.forEach((value) => {
        let re = new RegExp(searchWord, "i");
        if (value.search(re) >= 0) {
            searchResults.push(value)
            isFound = 1
        }
    })
    var eventList = document.getElementsByClassName("event-list")[0];
    eventList.innerHTML = "";
    searchResults.forEach((value) => {
        var event = document.createElement("div");
        event.classList.add("event");
        event.innerHTML = `<p>${value}</p>`
        eventList.append(event)
    })
    var notFound = document.getElementsByClassName("not-found")[0];
    if (!isFound) {
        notFound.classList.remove("nothing-close")
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
    let container = document.querySelector('.event-participants-container-' + n);
    container.innerHTML = "";
    for (let name of participantsList) {
        container.innerHTML += `<div class="event-participant" id="${name}">
        <input type="checkbox" class="participant-checkbox" id="${name + 3 + n}">
        <h3 class="event-participant-name">${name}</h3>
        <div class="participant-contribution-container">
        <input class="participant-contribution" id="${name + n}">   
        </div>
        </div>`;
        console.log(name);
    }
}
// to check if func is working


// function to display advanced settings
function toggleSettings(n) {
    isAdvanced = 1
    let text = document.getElementById('settings' + n);
    let inputs = document.querySelectorAll('.participant-contribution');
    if (text.style.color != 'green') {
        inputs.forEach((input) => {
            input.style.display = 'block';
        })
        text.style.color = 'green';
    } else {
        inputs.forEach((input) => {
            input.style.display = 'none';
        })
        text.style.color = 'white';
    }
}

// functions to nav through popups =====

let slideCounter = 0;
function setEventPosition() {
    slideCounter = 0;
    const popups = document.querySelectorAll('.pop-up-event');
    popups.forEach((popup, index) => (
        popup.style.left = `${index * 100}%`
    ))
    popups.forEach((popup, index) => (
        popup.style.top = `${-index * 100}%`
    ))
    popups.forEach((popup) => {
        popup.style.transform = `translateX(0)`
    })
}
// setEventPosition();
function goNext() {
    const popups = document.querySelectorAll('.pop-up-event');
    if (slideCounter >= 1) {
        eventPageDone();
    };
    slideCounter++;
    popups.forEach((popup) => {
        popup.style.transform = `translateX(-${slideCounter * 100}%)`
    })
    // console.log(popups);
}

function goPrev() {
    const popups = document.querySelectorAll('.pop-up-event');
    if (slideCounter <= 0) return;
    slideCounter--;
    popups.forEach((popup) => {
        popup.style.transform = `translateX(-${slideCounter * 100}%)`
    })
    // console.log(popups);
}

// work in progress
function updateBtns() {

}
// ==============================================================================

function editP(flag) {
    var participantsPage = document.getElementsByClassName("participants_n_tripname")[0];
    if (flag == 1) {
        participantsPage.style.display = 'flex';
    }
    else {
        // Create an XMLHttpRequest object
        const xhr = new XMLHttpRequest();

        // Prepare the data to be sent
        const data = new FormData();
        data.append('participantsList', JSON.stringify(participantsList));

        // Set up the AJAX request
        xhr.open('POST', 'participants.php', true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log(xhr.responseText); // Handle the response from PHP
            }
        };

        // Send the request
        xhr.send(data);

        participantsPage.style.display = 'none';
    }
}

function createEvent() {
    var createEventPage = document.getElementsByClassName("create-event-page")[0];
    createEventPage.style.display = 'flex';
    setEventPosition();
    displayParticipants(1);
    displayParticipants(2);
}


// Do not touch nimai's gurl once more

function fetchParticipants() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'fetch_participants.php', true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var entries = JSON.parse(this.responseText);
                // console.log(entries instanceof Array);
                displayParticipantEntries(entries);
                console.log(participantsList)
                updatePList();
                if (participantsList.length == 0) {
                    editP(1)
                }
            } else {
                console.error('Fetching paricipants error!');
            }
        }
    };
}

function fetchEvents() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'fetch_events.php', true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var entries = JSON.parse(this.responseText);
                displayEventEntries(entries);
                displayEvents();
            } else {
                console.error('Fetching events error!');
            }
        }
    };
}

function fetchEventData(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'fetch_eventData.php', true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var entries = JSON.parse(this.responseText);
                displayEventDataEntries(entries);
            } else {
                console.error('Fetching eventsData error!');
            }
        }
    };
}

function displayEventDataEntries(entries) {

    entries.forEach(function (entry) {
        eventsData.push(Object.values(entry));
    });
}

function displayEventEntries(entries) {

    entries.forEach(function (entry) {
        eventsList.push(entry)
    });
}

// Function to display entries on the page
function displayParticipantEntries(entries) {

    entries.forEach(function (entry) {
        participantsList.push(entry)
    });
}

// Fetch entries when the page loads
//2D Array of data
const eventsData = [];
fetchEventData();

eventsList.forEach(() => {
    var row = [];
    participantsList.forEach(() => { row.push(0) })
    eventsData.push(row)
})


function eventPageDone() {
    var eventName = document.getElementsByClassName("event-name-input")[0].value;
    var totalAmount = Number(document.getElementsByClassName("event-amount-input")[0].value);
    if (isNaN(totalAmount)) {
        alert("You entered Invalid amount!!")
        return;
    }
    eventsList.push(eventName)
    console.log(eventsList)
    displayEvents()
    let index = 0;
    var row = [];
    participantsList.forEach(() => { row.push(0) })
    eventsData.push(row)
    if (isAdvanced) {
        var isEntered = 0;
        participantsList.forEach((name) => {
            var paidAmount = document.getElementById(`${name + 1}`).value;
            var toPayAmount = document.getElementById(`${name + 2}`).value;
            if (paidAmount != null || toPayAmount != null) isEntered = 1;
            eventsData[eventsList.indexOf(eventName)][index] = paidAmount - toPayAmount;
            index++;
        })
        if (isEntered) {
            var paidParticipants = []
            var toPayParticipants = []
            participantsList.forEach((name) => {
                if (document.getElementById(`${name + 3 + 1}`).checked) {
                    paidParticipants.push(name)
                }
                if (document.getElementById(`${name + 3 + 2}`).checked) {
                    toPayParticipants.push(name)
                }
            })
            var indAmountPaid = totalAmount / paidParticipants.length;
            var indAmounttoPay = totalAmount / toPayParticipants.length;
            paidParticipants.forEach((name) => {
                eventsData[eventsList.indexOf(eventName)][participantsList.indexOf(name)] += indAmountPaid;
            })
            toPayParticipants.forEach((name) => {
                eventsData[eventsList.indexOf(eventName)][participantsList.indexOf(name)] -= indAmounttoPay;
            })
        }
    }
    else {
        var paidParticipants = []
        var toPayParticipants = []
        participantsList.forEach((name) => {
            if (document.getElementById(`${name + 3 + 1}`).checked) {
                paidParticipants.push(name)
            }
            if (document.getElementById(`${name + 3 + 2}`).checked) {
                toPayParticipants.push(name)
            }
        })
        var indAmountPaid = totalAmount / paidParticipants.length;
        var indAmounttoPay = totalAmount / toPayParticipants.length;
        paidParticipants.forEach((name) => {
            eventsData[eventsList.indexOf(eventName)][participantsList.indexOf(name)] += indAmountPaid;
        })
        toPayParticipants.forEach((name) => {
            eventsData[eventsList.indexOf(eventName)][participantsList.indexOf(name)] -= indAmounttoPay;
        })
    }
    console.log(eventsData);

    var createEventPage = document.getElementsByClassName("create-event-page")[0];
    createEventPage.style.display = 'none';
    document.getElementsByClassName("event-name-input")[0].value = "";
    document.getElementsByClassName("event-amount-input")[0].value = "";

    //Database for events
    const xhr = new XMLHttpRequest();
    const dataEventName = new FormData();
    dataEventName.append('eventsList', JSON.stringify(eventsList));
    xhr.open('POST', 'events.php', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log(xhr.responseText); // Handle the response from PHP
        }
    };
    xhr.send(dataEventName);


    const req = new XMLHttpRequest();
    const dataEventData = new FormData();
    dataEventData.append('eventsData', JSON.stringify(eventsData));
    req.open('POST', 'eventsData.php', true);
    req.onload = function () {
        if (req.status === 200) {
            console.log(req.responseText); // Handle the response from PHP
        }
    };
    req.send(dataEventData);
}

// functions to display event-wise results and final results
// =========================================================

/*
*  author : nimaiparsa 
*  dont touch my gurl
*/

function displayEventResults(event) {
    const graphPositive = document.getElementsByClassName('graph-positive')[0];
    const graphNegative = document.getElementsByClassName('graph-negative')[0];
    const spent = document.getElementsByClassName('spent-body')[0];
    const net = document.getElementsByClassName('net-body')[0];
    graphPositive.innerHTML = "";
    graphNegative.innerHTML = "";
    spent.innerHTML = "";
    net.innerHTML = "";

    let index = eventsList.indexOf(event);
    // let index = 0;

    console.log(event);
    console.log(eventsList[0]);

    let maxPrice = 0;
    for (let i of eventsData[index])
        maxPrice = Math.max(maxPrice, Math.abs(i));

    let posCount = 0;
    for (let i of eventsData[index])
        posCount += (i > 0);

    for (let i = 0; i < posCount; i++)
        graphNegative.innerHTML += `<div class="invisible-bar"></div>`;

    for (let member of eventsData[index]) {
        if (member > 0) {
            graphPositive.innerHTML += `<div class="positive-bar" style='height:${(member / maxPrice) * 80}%;'></div>`;
            console.log(member);
        } else if (member < 0) {
            graphNegative.innerHTML += `<div class="negative-bar" style='height:${-(member / maxPrice) * 80}%;'></div>`;
        }
    }

    for (let member in eventsData[index]) {
        net.innerHTML += `<div class="event-result">
        <h1 class="event-result-text">${participantsList[member]}</h1>
        <h1 class="event-result-text ${(eventsData[index][member] >= 0 ? 'positive-result' : 'negative-result')}">
        ${(eventsData[index][member] >= 0 ? '+' : '') + eventsData[index][member]}</h1>
        </div>`;
    }
}

function showResults() {
    const totalNet = Array(participantsList.length);
    for (let member = 0; member < participantsList.length; member++) {
        totalNet[member] = 0;
        for (let event = 0; event < eventsList.length; event++)
            totalNet[member] += eventsData[event][member];
    }

    const positive = new Array(), negative = new Array();
    for (let i = 0; i < totalNet.length; i++) {
        if (totalNet[i] >= 0) positive.push([totalNet[i], i]);
        else negative.push([totalNet[i], i]);
        console.log(negative);
        console.log(positive);
        console.log(totalNet[i]);
    }
    // return
    const pay = new Array(participantsList.length);
    const receive = new Array(participantsList.length);
    for (let i = 0; i < participantsList.length; i++) {
        pay[i] = new Array();
    }
    for (let i = 0; i < participantsList.length; i++) {
        receive[i] = new Array();
    }


    while (negative.length && positive.length) {
        let neg = negative[negative.length - 1];
        let pos = positive[positive.length - 1];
        if (positive[positive.length - 1][0] > negative[negative.length - 1][0]) {
            pay[negative[negative.length - 1][1]].push(negative[negative.length - 1][0], positive[positive.length - 1][1])
            receive[positive[positive.length - 1][1]].push(negative[negative.length - 1][0], negative[negative.length - 1][1])
            positive[positive.length - 1][0] += negative[negative.length - 1][0];
            negative.pop();
            continue;
        } else if (positive[positive.length - 1][0] == negative[negative.length - 1][0]) {
            pay[negative[negative.length - 1][1]].push(negative[negative.length - 1][0], positive[positive.length - 1][1])
            receive[positive[positive.length - 1][1]].push(negative[negative.length - 1][0], negative[negative.length - 1][1])
            positive.pop();
            negative.pop();
            continue;
        }
        pay[negative[negative.length - 1][1]].push(positive[positive.length - 1][0], positive[positive.length - 1][1]);
        receive[positive[positive.length - 1][1]].push(positive[positive.length - 1][0], negative[negative.length - 1][1]);
        negative[negative.length - 1][0] += positive[positive.length - 1][0];
        positive.pop();
    }

    console.log(pay);

    console.log(totalNet);

    let finalPay = document.getElementById('final-pay');
    let finalReceive = document.getElementById('final-receive');

    finalPay.innerHTML = "";
    finalReceive.innerHTML = "";

    for (let i = 0; i < pay.length; i++) {
        if (pay[i].length == 0) continue;

        let finalParent = `<div class="final-parent">`;
        finalParent += `<div class="final-child" style="font-size: 1em;">
        <button id='drop-down'>></button>
        <p>${participantsList[i]} <span style='color:chartreuse;'>pays ${totalNet[i]}</span></p>
        </div>`;

        for (let member of pay[i]) {
            finalParent += `<div class="final-child">
            <p>${participantsList[i]} <span style='color:chartreuse; '>pays ${member[0]}</span> to ${member[1]}</p>
            </div>`;
        }

        finalParent += `</div>`;
        finalPay.innerHTML += finalParent;
    }
}

// =========================================================