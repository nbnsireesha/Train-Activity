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

//**************** get date difference ************************

  //       var addDate = moment(data.val().startDate);
		// console.log(addDate);
		// var dateTime = new Date(moment());
		// var interimDate = moment(dateTime).format("MM/DD/YY");
		// var endDate = moment(endDate);
  // 		//console.log('Difference is ', endDate.diff(addDate, 'months'), 'months');
  // 		var diffDate = endDate.diff(addDate, 'months')
  // 		console.log(diffDate);

  			var todayDate = new Date();
  			var frq = moment(data.val().frequency);
  			console.log(frq._i);
  			var firstdate = moment(data.val().firstTrainTime);
  			console.log(todayDate);
  			var currentTime = moment(todayDate).format("LT");
  			console.log(currentTime);
  			var trianstartTime = moment(firstdate);
  			console.log(trianstartTime._i);
  			var firstTrainTime = trianstartTime._i;
  			console.log(firstTrainTime);
  			var nextArrival = moment(firstTrainTime,"HH:mm").add(frq._i,'minutes').format("LT");
  			console.log("next is"+nextArrival);
  			var nextArrivalTrain = $("<td>");
  			nextArrivalTrain.append(nextArrival);
			r.append(nextArrivalTrain);

  			// var nextArrival = moment(firstdate).add(frequency,"minutes");
  			// console.log(nextArrival._i);
//*****************************************************************
		//calculate minutes away
		var startTime = moment(nextArrival,"hh:mm");
		var endTime = moment(currentTime,"hh:mm");
		var duration = moment.duration(startTime.diff(endTime));
		var minutes = parseInt(duration.asMinutes());
		console.log(minutes);
		var mins = moment.utc(moment(endTime, "HH:mm:ss").diff(moment(startTime, "HH:mm:ss"))).format("mm");
		console.log(mins);

		var minutesAway = $("<td>");
  		minutesAway.append(minutes);
		r.append(minutesAway);


		$("tbody").append(r);
	})
})

// 		var startTime=moment("12:16:59 am", "HH:mm:ss a");
// var endTime=moment("06:12:07 pm", "HH:mm:ss a");
// var duration = moment.duration(endTime.diff(startTime));
// var hours = parseInt(duration.asHours());
// var minutes = parseInt(duration.asMinutes())-hours*60;
// alert (hours + ' hour and '+ minutes+' minutes.');