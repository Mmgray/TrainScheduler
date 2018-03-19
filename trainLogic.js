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
      //Grabs user inputs
      var trainName = $("#trainNameInput").val().trim();
      var destination = $("#destinationInput").val().trim();
      var firstTrainUnix = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
      var frequency = $("#frequencyInput").val().trim();

      //Creates local "temporary" object for holding train data
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