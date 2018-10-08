$(document).ready(function () {

// Initialize Firebase
    var config = {
        apiKey: "AIzaSyCVxVciCIYs55XNbE-D8x1TRpAf9MfRvZE",
        authDomain: "train-scheduler-14fe2.firebaseapp.com",
        databaseURL: "https://train-scheduler-14fe2.firebaseio.com",
        projectId: "train-scheduler-14fe2",
        storageBucket: "train-scheduler-14fe2.appspot.com",
        messagingSenderId: "512916755294"
    };
    firebase.initializeApp(config);

//Most of the following lines were taken from the past classes and adjusted to this homework..

var dataRef = firebase.database();

//Next, is setting up the variables for the "Add Train Info" panel and on click submit button. 
    $("#addInfo").on("click", function (event) {
        event.preventDefault();

        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrain = $("#firstTrain").val().trim();
        var frequency = $("#interval").val().trim();

        dataRef.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
        });
    });

// Firebase watcher + initial loader.
    dataRef.ref().on("child_added", function (childSnapshot) {

        var addTrain = childSnapshot.val().trainName;
        var addDestination = childSnapshot.val().destination;
        var firstTrain = childSnapshot.val().firstTrain;
        var addFrequency = childSnapshot.val().frequency;

        var startTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");

//Time variables go next (taken from class)
        var currentTime = moment();
        var timeDifference = moment().diff(moment(startTimeConverted), "minutes");
        var remainder = timeDifference % addFrequency;
        var minutesAway = addFrequency - remainder;
        var nextTrain = moment().add(minutesAway, "minutes");
        var nextArrival = moment(nextTrain).format("HH:mm");

//Push to the table and displayed
        $("#table").append(
            " <tr><td>" + addTrain +
            " </td><td>" + addDestination +
            " </td><td>" + addFrequency +
            " </td><td>" + nextArrival +
            " </td><td>" + minutesAway + " </td></tr>");

// Clear input
        $("#trainName, #destination, #firstTrain, #interval").val("");
        return false;
    },
//Handle the errors
    function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

});