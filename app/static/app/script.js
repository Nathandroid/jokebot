initializeChat();
/*
	Notes for the morning:

	- Might want clearPresets() and addPresets() methods
	- Might want enable/disable keyboard methods but I'm not sure how that will work
	- Everything needs addMessage(), don't be stupid
	- Deleting jokes in the current instance might be impossible. Adding jokes too...
*/

/*
	Initialize joke list (or establish connection to it), print greeting from jokebot
	dependencies: list of jokes (I think)
	leads to: everything else (initial state and return state)
*/
function initializeChat() {
	console.log('Initialize chat');


	/* onload came from the second answer here: https://stackoverflow.com/questions/26107125/cannot-read-property-addeventlistener-of-null */
	window.onload = function(){
        document.getElementById("send").addEventListener("click", addUserMessage, false);
        document.getElementById("knock").addEventListener("click", knockKnock, false);

		addBotMessage('Hi there! My name is Jokebot and I love knock-knock jokes.');
    }

}

/*
	Add a message on the user side. Text is pulled from the text area and cleared
*/
function addUserMessage(messageToAdd) {
	/* reference appropriate elements */
	editText = document.querySelector(".edit-text");

	if (typeof messageToAdd != "string") { /* if message is coming from text box */
		/* return if no text to add */
		if (editText.value === '') {
			return;
		}
		messageToAdd = editText.value;
	}
	messages = document.querySelector(".messages");

	messageDiv = document.createElement("div");
	messageDiv.appendChild(document.createTextNode(messageToAdd));

	/* add appropriate classes */
	messageDiv.classList.add("message");
	messageDiv.classList.add("user-message");

	editText.value = ''; /* clear text box */
	messages.appendChild(messageDiv); /* append message to messages */
}


/*
	Add a message on the bot side. This will only be triggered by user interaction
*/
function addBotMessage(messageToAdd) {
	/* reference message list */
	messages = document.querySelector(".messages");

	messageDiv = document.createElement("div");
	messageDiv.appendChild(document.createTextNode(messageToAdd));

	/* add appropriate classes */
	messageDiv.classList.add("message");
	messageDiv.classList.add("bot-message");

	messages.appendChild(messageDiv); /* append message to messages */
}

/*
	Add 'knock knock' as user message and 'who's' there as bot message
	dependencies: addMessage(), required preset
	leads to: tellSetup()
*/
function knockKnock() {
	addUserMessage('Knock knock');
	setTimeout( function() {
		addBotMessage('Who\'s there?');
	}, 1000 )

	/* change the function that the send button is connected to */
	document.getElementById("send").removeEventListener("click", addUserMessage, false);
	document.getElementById("send").addEventListener("click", tellSetup, false);
}

/*
	Tell jokebot you want to hear a joke, they fetch one and print 'Knock knock'
	dependencies: addMessage(), list of jokes, required preset
	leads to: initial state (no jokes), fetchJoke()
*/
function requestJoke() {

}

/*
	Fetches a joke from the database and prints knock-knock
	dependencies: list of jokes, requestJoke()
	leads to: hearSetup()
*/
function fetchJoke() {

}

/*
	Provide the setup of your joke, bot responds
	dependencies: knockKnock(), access to keyboard
	leads to: tellPunchline(), forgotJoke() (cancel), 
*/
function tellSetup() {
	editText = document.querySelector(".edit-text");
	setup = editText.value;

	/* TODO: add forgotJoke preset */
	addUserMessage(setup); /* add message to chat */
	setTimeout( function() { /* add bot message to chat */
		addBotMessage(setup + '  who?');
	}, 1000 )

	document.getElementById("send").removeEventListener("click", tellSetup, false);
	/* passing callback functions with arguments: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener */
	document.getElementById("send").addEventListener("click", function completeJoke(){
		tellPunchline(setup);
		document.getElementById("send").removeEventListener("click", completeJoke, false);
	}, false);
}

/*	
	Works as a cancel method for telling a joke, adds 'I forget the rest' as user message
	dependencies: setup(), required preset
	leads to: return state
*/
function forgotJoke() {
	document.getElementById("send").addEventListener("click", addUserMessage, false);
}

/*
	Prints 'Who's' there?' on the user side, then the joke setup on the bot side
	dependencies: fetchJoke(), required preset
	leads to: hearPunchline(), interruptJoke()
*/
function hearSetup() {

}

/*
	Complete the joke which jokebot then adds to the DB (if possible)
	dependencies: access to keyboard
	leads to: addJoke(), return state
*/
function tellPunchline(setup) {
	console.log("Setup: " + setup);

	delivery = editText.value;
	addUserMessage(delivery);

	joke = {
		"setup": setup,
		"delivery": delivery
	}

	setTimeout( function() {
		addBotMessage("That is a good one. I will have to remember it.");
	}, 1000 )

	document.getElementById("send").addEventListener("click", addUserMessage, false);

	/* TODO: add joke to DB */
	console.log(joke);
}

function completeJoke(setup, delivery) {
	document.getElementById("send").addEventListener("click", function(){
		joke = {
			"setup": setup,
			"delivery": delivery
		}
	}, false );
	console.log(joke);
	/* TODO submit joke */
}

/*
	Jokebot completes the joke
	dependencies: hearSetup()
	leads to: interruptJoke(), return state
*/
function hearPunchline() {

}

/*
	State that you don't like the joke
	dependencies: hearSetup(), hearPunchline()
	leads to: deleteJoke() ?
*/
function interruptJoke() {

}

function addJoke() {

}

function deleteJoke() {

}

function addPreset() {

}

function deletePreset() {

}

function printList(jokes) {
	parsed = JSON.parse(jokes)

	for (const joke in parsed) {
		console.log(joke)
	}
}
