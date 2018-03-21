// Initialize Firebase
var config = {
    apiKey: "AIzaSyBAdkOJxBCeCyU6q0nQuh3zsTXMOodO0m8",
    authDomain: "train-scheduler-664ed.firebaseapp.com",
    databaseURL: "https://train-scheduler-664ed.firebaseio.com",
    projectId: "train-scheduler-664ed",
    storageBucket: "",
  };
  firebase.initializeApp(config);

  var trainData = firebase.database();
  //Button to add trains
  $("#addTrainBtn").on("click", function() {
      
    //User inputs
      var trainName = $("#trainNameInput").val().trim();
      var destination = $("#destinationInput").val().trim();
      var firstTrainUnix = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
      var frequency = $("#frequencyInput").val().trim();

      //hold train data
      var newTrain = {
          name: trainName,
          destination: destination,
          firstTrain: firstTrainUnix,
          frequency: frequency
      }

      //Uploads train data to the database
      trainData.ref().push(newTrain);

      //Logs everything to console
      console.log(newTrain.name);
      console.log(newTrain.destination);
      console.log(firstTrainUnix);
      console.log(newTrain.frequency);

      //Alert
      alert("Train successfully added");

      //Clears all of the text boxes
      $("#trainNameInput").val("");
      $("#destinationInput").val("");
      $("#firstTrainInput").val("");
      $("#frequencyInput").val("");

      //Determine when the next train arrives
      return false;
  });

  //Firebase event
  trainData.ref().on("child_added", function(childSnapshot, prevChildkey){
      console.log(childSnapshot.val());

      //Store everything into a variable
      var tName = childSnapshot.val().name;
      var tDestination = childSnapshot.val().destination;
      var tFrequency = childSnapshot.val().frequency;
      var tFirstTrain = childSnapshot.val().firstTrain;

      //Difference between the times
      var diffTime = moment().diff(moment.unix(tFirstTrain), "minutes");

      //Time apart
      var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency;

      //Minute Until train
      var tMinutesTillTrain = tFrequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

      //Next train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm A");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

      //Add each train's data into the table
      $("#trainTable > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
  });