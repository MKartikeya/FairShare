var participantsList = [];
fetchEntries();
function updatePList(){
    console.log(participantsList)
    participantsList.forEach((parName)=>{

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
const bgWelcome = document.querySelector(".bg-welcome");
const getStarted = document.querySelector(".getStarted");
const addedPList = document.getElementsByClassName("addedp-list")[0];
const searchBtn = document.querySelector(".search-btn")
const refreshBtn = document.querySelector(".refresh-btn")
const createEventBtn = document.querySelector(".create-event")
const participantsPageDone = document.querySelector(".finishPpage")
const editParticipants = document.querySelector(".delete-edit_participant")
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
const eventsList = ["Kartikeya", "Nimai", "Ananth"];

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
    buttonClicked.parentElement.remove()
}
function displayEvents() {
    var eventList = document.getElementsByClassName("event-list")[0];
    var notFound = document.getElementsByClassName("not-found")[0];
    notFound.classList.add("nothing-close")
    eventList.innerHTML = ""
    eventsList.forEach((value) => {
        var event = document.createElement("div");
        event.classList.add("event");
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
        <input type="checkbox" class="participant-checkbox">
        <h3 class="event-participant-name">${name}</h3>
        <div class="participant-contribution-container">
        <input class="participant-contribution">   
        </div>
        </div>`;
        console.log(name);
    }
}
// to check if func is working


// function to display advanced settings
function toggleSettings(n) {
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
    const popups = document.querySelectorAll('.pop-up-event');
    popups.forEach((popup, index) => (
        popup.style.left = `${index * 100}%`
        ))
        popups.forEach((popup, index) => (
            popup.style.top = `${-index * 100}%`
            ))
        }
        setEventPosition();
        function goNext() {
            const popups = document.querySelectorAll('.pop-up-event');
            if (slideCounter >= 1) return;
            slideCounter++;
            popups.forEach((popup) => {
                popup.style.transform = `translateX(-${slideCounter * 100}%)`
            })
            console.log(popups);
        }
        
        function goPrev() {
            const popups = document.querySelectorAll('.pop-up-event');
            if (slideCounter <= 0) return;
            slideCounter--;
            popups.forEach((popup) => {
                popup.style.transform = `translateX(-${slideCounter * 100}%)`
            })
    console.log(popups);
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
    displayParticipants(1);
    displayParticipants(2);
}


///////////// Do not touch nimai's gurl once more
// var xhr = new XMLHttpRequest(); // Create new XMLHttpRequest object

// xhr.onreadystatechange = function() {
    //   if (xhr.readyState === XMLHttpRequest.DONE) {
        //     if (xhr.status === 200) {
            //       var rows = JSON.parse(xhr.responseText); // Parse the response
            
            //       // Process the rows data
            //       displayRows(rows);
            //     } else {
                //       console.error('Error:', xhr.status);
                //     }
                //   }
                // };
                
                // xhr.open('GET', 'participants.php', true); // Set up the request
                // xhr.send(); // Send the request
                
                function fetchEntries() {
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', 'fetch_entries.php', true);
                    xhr.send();
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4) {
                            if (xhr.status === 200) {
                                var entries = JSON.parse(this.responseText);
                                // console.log(entries instanceof Array);
                                displayEntries(entries);
                                console.log(participantsList)
                                updatePList();
                                if(participantsList.length==0){
                                    editP(1)
                                }
                            } else {
                                console.error('hdeeeeeeeeeeeeeeeeeee');
                            }
                        }
                    };
                }
                
                // Function to display entries on the page
                function displayEntries(entries) {
                    
                    entries.forEach(function (entry) {
                        participantsList.push(entry)
                    });
                }
                
                // Fetch entries when the page loads
                