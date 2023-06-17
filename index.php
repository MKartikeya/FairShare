<?php include("server.php");?>

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

    <div class="pop-up-container participants_n_tripname" style="display: flex;">
        <div class="pop-up-window">
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
                        <div class="added-p">
                            <div class="addedp-name">Alice</div>
                            <i style="font-size:24px " class="fa newp-remove" id="reomveAlice">&#xf068;</i>
                        </div>
                        <div class="added-p">
                            <div class="addedp-name">Bob</div>
                            <i style="font-size:24px " class="fa newp-remove" id="reomveBob">&#xf068;</i>
                        </div>
                    </div>
                </div>
                <button class="next getStarted finishPpage">Next</button>
            </div>
        </div>
    </div>


    <div class="pop-up-container create-event-page" style="display: none;">
        <div class="pop-up-window">
            <div class="pop-up-slide-window">
                <div class="pop-up-event">
                    <div class="event-name-input-container-1">
                        <h3 class="event-input-title">Event Name</h3>
                        <input type="text" class="event-name-input" placeholder="Event Name">
                        <h3 class="event-input-title">Amount</h3>
                        <input type="text" class="event-name-input" placeholder="Amount">
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
                <!-- <div class="pop-up-event">
                    <div class="event-name-input-container-2">
                        <h3 class="event-input-title">Results</h3>
                    </div>
                    <div class="event-participants-container-2">
    
                    </div>
                </div> -->
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

    <!-- pop-ups end -->
    
    <div class="dashboard">
        <div class="nav-bar">
            <div class="Logo"></div>
            <button class="Show-result">Show Result</button>
            <button class="Create-new">Crete New</button>
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
            <div class="tools-container">
                <p class="tools-text">Tools</p>
                <div class="tools-content">
                    <button class="create-event">Create Event</button>
                    <!-- <button class="add-participant">Add Participants</button> -->
                    <button class="edit-events">Edit Events</button>
                    <button class="delete-edit_participant">Edit Participants</button>
                    <button class="show-result">Show Result</button>
                </div>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>

</html>