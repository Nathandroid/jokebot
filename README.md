# Jokebot
Jokebot is a Django-based bot chat where the bot can tell knock knock jokes from a database as well as re-tell jokes told by the user.

## Usage
From the root directory, use this command:
`python manage.py runserver`

Afterwards, you can find the chat at `localhost:8000/`

## Current Functionality
After starting up the server, a chat can be started with Jokebot. 

There is a list of preset messages that appears over the textbox. The presets trigger actions like beginning to tell a knock-knock joke or requesting one. Messages are only acknowledged by the jokebot if they are sent via presets or if a joke is currently being told.

Once a joke is told, the Jokebot expresses their appreciation and adds it to the MySQL database. They won't do this if the joke was interrupted.

Jokes can be fetched from the database with things like CURL or with explicit URLs (ex: localhost:8000/get/4), but they come through the HTTP request and are not parsed or loaded into the HTML.

### Issues With Current Functionality
* Jokebot isn't currently able to tell jokes because of issues I was having connecting the javascript to the database without a form.
* When Jokebot is told a joke, it adds it to the database and then the chat is refreshed  (messages reset). This shouldn't happen.
* No keyboard events are currently monitored so chat messages can only be sent by clicking the send button.

## Future Plans
* I plan to fix telling and being told jokes by implementing fetch requests in the JS instead of partially using forms.
* I will also be adding keyboard events to send messages.