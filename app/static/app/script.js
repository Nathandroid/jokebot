initializeChat();

/*
	Initialize joke list (or establish connection to it), print greeting from jokebot
*/
function initializeChat() {
	/* onload came from the second answer here: https://stackoverflow.com/questions/26107125/cannot-read-property-addeventlistener-of-null */
	window.onload = function(){
		addBotMessage('Hi there! My name is Jokebot and I love knock-knock jokes.');

		initialPresets();
        document.getElementById("send").addEventListener("click", addUserMessage, false);
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
	Add specific presets to the preset list
*/
function addPreset(id, text) {
	pList = document.querySelector(".presets");

	//set up the new preset
	preset = document.createElement("div");
	preset.appendChild(document.createTextNode(text));
	preset.setAttribute("id", id);
    preset.classList.add("preset");

	pList.appendChild(preset);
}

/*
	Clear the current presets from the list
	while loops is based off of https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
*/
function clearPresets() {
	presetList = document.getElementById("preset-list");
	while (presetList.lastElementChild) {
		presetList.removeChild(presetList.lastElementChild);
	}
}

/*
	Clear presets and add the two initial presets
*/
function initialPresets() {
	clearPresets();
	addPreset('knock', 'Knock Knock');
	addPreset('request', 'I want to hear a joke');

	document.getElementById("knock").addEventListener("click", knockKnock, false);
    document.getElementById("request").addEventListener("click", requestJoke, false);
}

/*
	Add 'knock knock' as user message and 'who's' there as bot message
*/
function knockKnock() {
	addUserMessage('Knock knock');
	setTimeout( function() {
		addBotMessage('Who\'s there?');
	}, 1000 )

	/* add new preset for forgetting joke */
	clearPresets();
	addPreset('forget', 'I forget the reset');
	document.getElementById('forget').addEventListener("click", forgotJoke, false);

	/* change the function that the send button is connected to */
	document.getElementById("send").removeEventListener("click", addUserMessage, false);
	document.getElementById("send").addEventListener("click", tellSetup, false);
}

/*
	Provide the setup of your joke, bot responds
	dependencies: knockKnock(), access to keyboard
	leads to: tellPunchline(), forgotJoke() (cancel), 
*/
function tellSetup() {
	editText = document.querySelector(".edit-text");
	setup = editText.value;

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
	addUserMessage('I forget the rest');
	setTimeout( function() { /* add bot message to chat */
		addBotMessage('That\'s okay');
	}, 1000 )

	document.getElementById("send").removeEventListener("click", tellSetup, false);
	document.getElementById("send").addEventListener("click", addUserMessage, false);
	initialPresets();
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

	/*
		Calling this seems to properly add non-empty jokes into the DB, but it reloads the page
	*/
	completeJoke(setup, delivery);
}

function completeJoke(setup, delivery) {
	document.getElementById("send").addEventListener("click", function(){
		joke = {
			"setup": setup,
			"delivery": delivery
		}
	}, false );
	console.log("about to submit form");
	submitForm(setup, delivery);
}

/*
	JS form submission: https://www.w3schools.com/jsref/met_form_submit.asp
*/
function submitForm(setup, delivery) {
	console.log("submitting form");
	submit = document.getElementById("submit");
	setupInput = document.getElementById("setup_id");
	deliveryInput = document.getElementById("delivery_id");

	//set input values and deliver form
	setupInput.value = setup;
	deliveryInput.value = delivery;
	submit.click();

	//clear input values
	setupInput.value = "";
	deliveryInput.value = "";
}

/*
	Tell jokebot you want to hear a joke, they fetch one and print 'Knock knock'
	dependencies: addMessage(), list of jokes, required preset
	leads to: initial state (no jokes)
*/
function requestJoke() {

	//TODO
	addBotMessage("I'm not advanced enough to tell jokes yet");

}

/*
	Prints 'Who's' there?' on the user side, then the joke setup on the bot side
	dependencies: fetchJoke(), required preset
	leads to: hearPunchline()
*/
function hearSetup() {

}

/*
	Jokebot completes the joke
	dependencies: hearSetup()
	leads to: return state
*/
function hearPunchline() {

}