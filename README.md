Lunch-bot: 

Objective:
Slack-bot that creates random groups for lunch out of office. 

Resume:
To use Lunch-bot, he must be added to the general channel of the Slack account. When it is time for having a lunch out of office, the command "Lunch-bot on" is called, and Lunch-bot gives you the specific way you have to respond to join the eating-out-of-office group. Lunch-bot responds to every join solicitude with a confirmation phrase and gives a disclaimer message if you tried to join more than once. 
When it is time to stop listening, the command "Lunch-bot off" must be invoked to stop Lunch-bot. 
At this point, he does his magic:
He shuffles the employees into random groups (<=7 people), and choose a leader for each group. 
----------------------------------------------------------------
Tech: 
Developed with Node.js. 
It requires npm packages @slack/client, process.env, and lodash library.

Connexion Bot-Slack developed with Botkit tool (index.js).
Bot logic starts at line 50 (index.js).

Server config:
Developed in a Node.js local server with localtunnel to allow public access to the server, so it runs with: 
$ CLIENT_ID=XXXXXXXXXXXX.YYYYYYYYYYYY CLIENT_SECRET=******************************** PORT=3000 npm start
(CLIENT_ID and CLIENT_SECRET provided by Slack configuration of the API).  
----------------------------------------------------------------
Bugs pending to fix: 
  1) It is possible to assign "employees" array to a "previous week" array, in order to compare them and make the assignation of employee per group, and a leader, without random functions. 
  2) A local database (MongoDB, Mongoose) can be used to make a CRUD with the groups and leader configuration every week, and apply specific functions to ensure everyone has the opportunity to lunch with everyone. 