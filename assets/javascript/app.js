 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBX3i9bKkWdTFbXFyXWM0N2qaPHf_keynY",
    authDomain: "train-information-17dc6.firebaseapp.com",
    databaseURL: "https://train-information-17dc6.firebaseio.com",
    projectId: "train-information-17dc6",
    storageBucket: "",
    messagingSenderId: "572133331253"
  };
  firebase.initializeApp(config);


// Create a variable to reference the database.
var database = firebase.database();

//put all code inside document.ready function
$(document).ready(function(){
	$("#submit-employee").on("click", function(event){
		//prevent default form submission
		event.preventDefault();

		//pulling data out of the form and resetting the fields
		var trainName = $("#train-name").val().trim();
		$("#train-name").val("");
		var destination = $("#Destination").val().trim();
		$("#Destination").val("");
		var firstTrainTime = $("#first-train-time").val().trim();
		$("#first-train-time").val("");
		var frequency = $("#frequency").val().trim();
		$("#frequency").val("");

		//push data to database
		database.ref("/trains").push({
			trainName: trainName,
			destination: destination,
			firstTrainTime: firstTrainTime,
			frequency: frequency
		})
	})

	var trainRef = firebase.database().ref("/trains");
	
	trainRef.on('child_added', function(data){
		console.log(data.val());
		console.log(data.val().trainName);
		r = $("<tr>");
		var trainName = $("<td>");
		console.log(trainName)
		trainName.append(data.val().trainName);
		r.append(trainName);
		var destination = $("<td>");
		destination.append(data.val().destination);
		r.append(destination);

		var frequency = $("<td>");
		frequency.append(data.val().frequency);
		r.append(frequency);

		
		var ftt = data.val().firstTrainTime;
		var freq = data.val().frequency;
		console.log(data.val().firstTrainTime);
		console.log(data.val().frequency);

		var currentTime = moment();
		console.log(moment(currentTime).format("hh:mm"));

		var firstTimeconvertion = moment(ftt,"hh:mm").subtract(1,"days");
		console.log(firstTimeconvertion)

		var timeDiff = moment().diff(moment(firstTimeconvertion),"minutes");
		console.log("Difference in time: " + timeDiff);

		var remainder = timeDiff % freq;
		console.log("Remainder: ", remainder);

		var minsUntilTrain = freq - remainder;
		console.log("Time Til Train: " + minsUntilTrain);

		var nextTrainTime = moment().add(minsUntilTrain, "minutes");
		console.log("Next arrival: " + moment(nextTrainTime).format("hh:mm"));
		var gom = moment(nextTrainTime).format("hh:mm A");
		console.log(gom);

		//var nextTrainTimeFormated = moment().add(minsUntilTrain, "minutes");

		var nextTrainAt = $("<td>");
		nextTrainAt.append(gom);
		r.append(nextTrainAt);

		var minRemain = $("<td>");
		minRemain.append(minsUntilTrain);
		r.append(minRemain);


		 $("tbody").append(r);
	})
})

// 		var startTime=moment("12:16:59 am", "HH:mm:ss a");
// var endTime=moment("06:12:07 pm", "HH:mm:ss a");
// var duration = moment.duration(endTime.diff(startTime));
// var hours = parseInt(duration.asHours());
// var minutes = parseInt(duration.asMinutes())-hours*60;
// alert (hours + ' hour and '+ minutes+' minutes.');