## Lunch-bot

### Objective:

Slack-bot that creates random groups for lunch out of office. 

### Resume: 

To use Lunch-bot, it must be added to the general channel of the Slack account. 
When it is time for having a lunch out of office, the command "Lunch-bot on" is called, and Lunch-bot gives you the specific command you have to respond to join the group. 
Lunch-bot responds to every join-solicitude with a confirmation, and gives a disclaimer message if you tried to join more than once. 
When it is time to stop listening, the command "Lunch-bot off" must be invoked, and Lunch-bot does its magic: it shuffles the employees into evenly spplited random groups (<= 7 people), and choose a leader for each group to decide where to eat. 

---

### Tech: 

Developed with Node.js. 
It requires npm packages @slack/client, process.env, and lodash library.
Connexion Bot-Slack developed with Botkit tool (index.js).
Bot logic starts at line 50 (index.js).

### Server config: 

Developed in a Node.js local server with localtunnel to allow public access to the server, so it runs with:

$ CLIENT_ID=XXXXXXXXXXXX.YYYYYYYYYYYY CLIENT_SECRET=******************************** PORT=3000 npm start

---

### Bugs pending to fix: 
- It is possible to assign "employees" array to a "previous week" array, in order to compare them and make the assignation of employee per group, and a leader, without random functions. 
- A local database (MongoDB, Mongoose) can be used to make a CRUD with the groups and leader configuration every week, and apply specific functions to ensure everyone has the opportunity to lunch with everyone. 
