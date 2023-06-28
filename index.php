<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FairShare</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://fontawesome.com/icons/filter?f=classic&s=solid&an=bounce&pc=%231a5181">
</head>

<body>
    <div class="bg-welcome remove">
        <div class="text-container ">

            <div class="text-box">

                <h1>Gone for A Trip?</h1>
                <hr>
                <p>Finding it difficult to split the expenses?</p>
                <p>You've come to the right place, the FairShare.</p>
                <button class="getStarted">Get Started</button>
            </div>
        </div>
        <div class="snow"></div>
    </div>

    <!-- pop-ups -->

    <div class="pop-up-container participants_n_tripname" style="display: none;">
        <div class="pop-up-window">
        <i style="font-size:24px" class="fa close-popup-btn">&#xf00d;</i>
            <div class="pop-up">
                <div class="trip-name-input">
                    <p class="trip-title font">Trip Name</p>
                    <input type="text" class="trip-name" placeholder="Trip Name">
                </div>

                <p class="addp-title font">
                    Add Participants
                </p>
                <div class="add-participants-list">
                    <div class="new-participant">
                        <input type="text" class="newp-name font" placeholder="Participant Name">
                        <div class="newp-btns">
                            <i style="font-size:24px" class="fa newp-add">&#xf067;</i>
                            <!-- <i style="font-size:24px " class="fa newp-remove">&#xf068;</i> -->
                        </div>
                    </div>
                    <div class="addedp-list">
                        
                    </div>
                </div>
                <button class="next getStarted finishPpage">Next</button>
            </div>
        </div>
    </div>


    <div class="pop-up-container create-event-page" style="display: none;">
        <div class="pop-up-window">
        <i style="font-size:24px" class="fa close-popup-btn">&#xf00d;</i>
            <div class="pop-up-slide-window">
                <div class="pop-up-event">
                    <div class="event-name-input-container-1">
                        <h3 class="event-input-title">Event Name</h3>
                        <input type="text" class="event-name-input" placeholder="Event Name">
                        <h3 class="event-input-title">Amount</h3>
                        <input type="text" class="event-name-input event-amount-input" placeholder="Amount">
                        <h3 class="event-input-title">Who Paid?</h3>
                    </div>

                    <div class="event-participants-container-1">
                    </div>

                </div>
                <div class="pop-up-event">
                    <div class="event-name-input-container-2">
                        <h3 class="event-input-title">How Much to Pay?</h3>
                    </div>
                    <div class="event-participants-container-2">
                    </div>
                   
                </div>
            </div>
            <div class="event-next-page">
                <div class="next-previous">
                    <button class="event-btn" onclick="goPrev()">
                        <</button>
                    <button class="event-btn" onclick="goNext()">></button>
                </div>
                <div class="events-settings">
                    <a onclick="toggleSettings(1)" id="settings1">Advanced Settings</a>
                </div>
            </div>
        </div>
    </div>

    <div class="pop-up-container delete-p-page" style="display: none;">
        <div class="pop-up-window delete-p-popup">
            <h1 class="p-delete-heading">FairShare</h1>
            <p class="p-delete-alert">
                The Participant that you are trying to delete is involved in the following events.Please edit them to delete the participant.
            </p>
            <div class="p-delete-btns">
                <!-- <button class="p-delete-cancel">
                    Cancel
                </button> -->
                <button class="p-delete-continue">
                    Continue
                </button>
            </div>
        </div>
    </div>
    <!-- pop-ups end -->
    
    <div class="dashboard">
        <div class="nav-bar">
            <div class="Logo"></div>
            <button class="Show-result">Show Result</button>
            <button class="Create-new">Create New</button>
            <button class="Delete-present">Delete Present</button>
            <button class="About-us">About Us</button>
        </div>
        <div class="dash-container">
            <div class="event-list-container">
                <div class="search-bar-container">
                    <p class="events-text">Events</p>
                    <div class="search-container">
                        <i style="font-size:24px" class="fa refresh-btn">&#xf021;</i>
                        <input type="text" class="search-bar" placeholder="search">
                        <button class="search-btn"><i style="font-size:25px" class="fa">&#xf002;</i></button>
                    </div>
                </div>
                <div class="event-list">
                </div>
                <div class="not-found nothing-close">No such Event found</div>
            </div>
            <div class="display-area">
                <div class="display-graph-container">
                    <div class="graph-positive">
                        
                    </div>
                    <div class="graph-negative">
                        
                    </div>
                </div>

                <div id="final-pay" class="display-final">

                </div>
                <div id="final-receive" class="display-final">
                    <div class="final-parent">
                        <div class="final-child" style="font-size: 1em;">
                            <button id='drop-down'>></button>
                            <p>Nimai <span style='color:chartreuse;'>pays 50</span></p>
                        </div>
                        <div class="child-container">
                        <div class="final-child">
                            <p>Nimai <span style='color:chartreuse; '>pays 50</span> to me</p>
                        </div>
                        </div>
                    </div>

                </div>


                <div class="display-net">
                    <div class="net-head">
                        <h1>Participant</h1>
                        <h1>Net</h1>
                    </div>
                    <div class="net-body">
                        <div class="event-result">
                            <h1 class="event-result-text">Name</h1>
                            <h1 class="event-result-text positive-result">+50</h1>
                        </div>
                        <div class="event-result">
                            <h1 class="event-result-text">Name2</h1>
                            <h1 class="event-result-text negative-result">-50</h1>
                        </div>
                    </div>
                </div>
                <div class="display-spent">
                    <div class="spent-head">
                        <h1>Participant</h1>
                        <h1>Spent</h1>
                    </div>
                    <div class="spent-body">

                    </div>
                </div>
            </div>
            <div class="tools-container">
                <p class="tools-text">Tools</p>
                <div class="tools-content">
                    <button class="create-event">Create Event</button>
                    <!-- <button class="add-participant">Add Participants</button> -->
                    <button class="edit-events">Edit Event</button>
                    <button class="delete-edit_participant">Edit Participants</button>
                    <button class="show-result" onclick="showResults()">Show Result</button>
                </div>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>

</html>