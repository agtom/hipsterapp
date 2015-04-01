Developer spec

1) Set up a server to listen for incoming requests on a certain port
Test: 
Server is 'listening' on port ####

2) Server must be accessible via a public IP address
Test: 
Accessible via a telnet by another 'user'

3) On connecting, hipster devs must see details relating to upcoming meetup:
- date
- topic
- location
Test: 
Appears to client on log-in

4) Hipster dev must be able to RSVP; RSVP must contain names and emails; RSVP not allowed without providing names and emails
Test: 
RSVP requested from hipster dev on log-in after event details;
Exit route offered if hipster dev doesn't wish to RSVP;
Prompt to try again if RSVP is incomplete;

5) Names and emails must be collected; developers must see how many are attending
Test:
A new file is written containing the emails and names
This file is read and supplemented with new info for each user
A counter is incremented for each new RSVP which in turn triggers a message including new counter number

6) Multiple users can access app
Test:
Sign in from different telnet dial-ins
Ensure the counter triggers from different dial-ins

7) Genevieve: to telnet in and get current list of developers; to change date and topic from telnet; to clear RSVPs to prepare for new meetup - all of the above to be private functionality
Test:
Gen to have codewords that perform the above functions
Gen to write a new file containing names and email addresses if the topic changes - this has the benefit of saving previous list for reference whilst also creating a new one automatically
Gen can change the location and date without clearing the whole meetup, i.e. a last minute change of location for the same meetup
Gen can start afresh, resetting the counter and changing the date, topic and location if she chooses

7) is strongly linked to Gen's personal spec in terms of how to use the app

Client spec
1) 'hipstalist'
- gives you the list of all current attendees and their emails

2) 'hipstanewlocation=' followed by a location (no spaces) will change the location

3) 'hipstanewdate=' followed by a date (no spaces) will change the date

4) 'hipstanewtopic=' followed by a topic (no spaces) will change the topic and will also start a new list of emails and names however it wont delete the previous one

2), 3) and 4) don't reset the meetup, they just change details

5) 'hipstaclear' resets the counter and will prompt you to go through steps 2)-4) which will completely reset the meetup

*** It's important you don't add spaces for steps 2) 3) and 4). 
E.g.
'hipstanewlocation = london' will save as a user because it has 3 arguments
'hipstanewlocation= San Francisco' will do the same








