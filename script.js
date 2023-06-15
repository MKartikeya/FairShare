const bgWelcome = document.querySelector(".bg-welcome")
const getStarted = document.querySelector(".getStarted")
const addedPList = document.getElementsByClassName("addedp-list")[0];
const searchBtn=document.querySelector(".search-btn")
const refreshBtn=document.querySelector(".refresh-btn")
getStarted.addEventListener("click", closePop)
refreshBtn.addEventListener("click",displayEvents)
searchBtn.addEventListener("click",searchFilter)
var participantsList = []
const eventsList = ["Kartikeya","Nimai","Ananth"];

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
    let container = document.getElementsByClassName('event-participants-container');
    for (let name of participantsList) {
        let participant = document.createElement('div');
        participant.className = 'event-participant';
        participant.id = `${name}`;
        participant.innerHTML = `<input type="checkbox" class="participant-checkbox">
            <h3 class="event-participant-name">${name}</h3>
            <div class="participant-contribution-container">
            <input class="participant-contribution">   
            </div>`;

        container.innerHTML += participant;
    }
}
function displayEvents(){
    var eventList=document.getElementsByClassName("event-list")[0];
    var notFound=document.getElementsByClassName("not-found")[0];
        notFound.classList.add("nothing-close")
    eventList.innerHTML=""
    eventsList.forEach((value)=>{
        var event=document.createElement("div");
        event.classList.add("event");
        event.innerHTML=`<p class="event-p">${value}</p>`
        eventList.append(event)
    })
}
function searchFilter(){
    var searchBar=document.getElementsByClassName("search-bar")[0];
    var searchWord=searchBar.value
    if(searchWord=="") return;
    var isFound=0
    var searchResults=[]
    eventsList.forEach((value)=>{
        let re = new RegExp(searchWord, "i");
        if(value.search(re)>=0){
            searchResults.push(value)
            isFound=1
        }
    })
    var eventList=document.getElementsByClassName("event-list")[0];
    eventList.innerHTML="";
    searchResults.forEach((value)=>{
        var event=document.createElement("div");
        event.classList.add("event");
        event.innerHTML=`<p>${value}</p>`
        eventList.append(event)
    })
    var notFound=document.getElementsByClassName("not-found")[0];
    if(!isFound){
        notFound.classList.remove("nothing-close")
    }
    searchBar.value="";
}