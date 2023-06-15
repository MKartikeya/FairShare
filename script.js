const bgWelcome = document.querySelector(".bg-welcome")
const getStarted = document.querySelector(".getStarted")
const addedPList = document.getElementsByClassName("addedp-list")[0];
getStarted.addEventListener("click", closePop)

var participantsList = ["Nimai", "Nithya", "Ananth", "Kartikeya"];
const eventsList = [];

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

const addPbtn = document.querySelector('.newp-add')
addPbtn.addEventListener("click", addPToList);
function addPToList() {
    var inputField = document.querySelector(".newp-name")
    var parName = inputField.value;
    inputField.value = "";
    var pBox = document.createElement("div")
    pBox.classList.add('added-p');
    if (parName != "") {
        participantsList.push(parName)


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

function displayParticipants() {
    let container = document.querySelector('.event-participants-container');
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
displayParticipants();

// function to display advanced settings
function toggleSettings() {
    let inputs = document.querySelectorAll('.participant-contribution');
    inputs.forEach((input) => {
        input.style.display = 'block';
    })

    let text = document.getElementById('settings');
    // text.style.textDecoration = 'none';
    text.style.color = 'green';
    
}