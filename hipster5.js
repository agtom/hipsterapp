var chalk = require('chalk');
var fs = require('fs');
var net = require('net');
var port = 3000;
var date = "01/04/2015";
var topic = "skinny jeans";
var location = "hipster hangout";
var array = [];
var count = 0;
var password = "hipstazrule"

var server = net.createServer(function(socket) {
  	console.log('client connected');
  	socket.write(chalk.white("\nWelcome!\n\nPlease see below the details for out next meetup:\n\nDate: " + date + "\nTopic: " + topic + "\nLocation: " + location + "\n\n"));
  	socket.write("If are a guest and you would like to attend, please can you provide us with your: \nfirstname\nlastname\nemail address\n(e.g. Mickey Mouse mickey@disney.com)\n\n");
    socket.write(chalk.cyan("Alternatively, if you aren't feeling hipster enough this time, you can exit the app by writing 'Hasta la vista'\n\n"))
    socket.write(chalk.yellow("If you are an admin, feel free to use your secret commands...\n\n"));

  	socket.on('data', function(data) {
  		var answerFromCL = data.toString().toLowerCase().trim();
  		var answerInArray = answerFromCL.split(" ");
      if(answerFromCL === "hipstalist") {
          if(count === 0) {
            socket.write("\nSorry, no guest list yet dude\n\n")
          }
          else if (count > 0) {
              fs.readFile(topic + ".json", function(err, data) {
                  socket.write("\n" + data + "\n\n");
              });
          }
      }
      else if(answerFromCL.search("hipstanewdate=") === 0) {
          date = answerFromCL.slice(14);
          socket.write("\nNew date confirmed: " + date + "\n\n");
      }
      else if(answerFromCL.search("hipstanewtopic=") === 0) {
          topic = answerFromCL.slice(15);
          socket.write("\nNew topic confirmed: " + topic + "\n\n");
      }
      else if(answerFromCL.search("hipstanewlocation=") === 0) {
          location = answerFromCL.slice(18);
          socket.write("\nNew location confirmed: " + location + "\n\n");
      }
      else if(answerFromCL === "hipstaclear") {
          count = 0;
          socket.write("\nPlease update the date, topic and location for your new event\n\n")
      }
      else if(answerFromCL === "hasta la vista") {
          socket.write("\nNo worries dude, keep drinking organic coffee and wearing ethically sourced garms!! Maybe next time\n\n");
          socket.end();
      }
  		else if(answerFromCL != "hasta la vista") {
	    	  if(answerInArray.length != 3) {
    		      socket.write("\nIf rsvp-ing, please ensure you enter a firstname, a last name and an email address.\n\n");
              socket.write(chalk.cyan("Remember to exit type 'hasta la vista'!\n\n"));
          } 
          else if(answerInArray.length === 3) {
              count++;
              console.log(count);
              socket.write("\nThanks! Fyi, the number of attendees for this event is currently " + count + "\n\n");	
              socket.write("Sometimes, event details change. Please see confirmation below:\n\nDate: " + date + "\nTopic: " + topic + "\nLocation: " + location + "\n\n"); 
                  if(count === 1) {
                  // console.log("our answer in the command line is a " + typeof answerFromCL + " and looks like this: " + answerFromCL)
                  // console.log("we then split this into an array: " + answerInArray + " : an " + typeof answerInArray)
                      var jsonified = JSON.stringify(answerInArray);
                  // console.log("first we json this into a " + typeof jsonified + " note this is a 'JSON string, i.e. an array with strings inside, giving us " + jsonified + "which we write it into a new file")
                      fs.writeFile(topic + ".json", jsonified, function(err) {})
                  } else if (count > 1) {
                  // console.log("then we receive our second input " + answerFromCL)
                      fs.readFile(topic + ".json", function(err, data) {
                          var parsedJson = JSON.parse(data);
                  // console.log("then we read the new file we created and parse our first input back into a " + typeof parsedJson + " which looks like: " + parsedJson);
                  // console.log("so now we have out first input: " + parsedJson + "and our second input: " + answerFromCL)
                          parsedJson.push(answerFromCL);
                  // console.log("then we push our second input into our now parsed first input creating " + parsedJson);
                          var jsonified = JSON.stringify(parsedJson);
                      // console.log("the we reJson the combined input into " + jsonified);
                      fs.writeFile(topic + ".json",jsonified,function(err) {})        
                      });
                  }
          }
      }
});

  	socket.on('end', function() {
    	 console.log('client disconnected');
  	});
});

server.listen(port, function() { //'listening' listener
  console.log('listening on port ' + port );
});
