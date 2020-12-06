console.log('It is working!');

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

}

/*
	Add 'knock knock' as user message and 'who's' there as bot message
	dependencies: addMessage(), required preset
	leads to: tellSetup()
*/
function knockKnock() {

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

}

/*	
	Works as a cancel method for telling a joke, adds 'I forget the rest' as user message
	dependencies: setup(), required preset
	leads to: return state
*/
function forgotJoke() {

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
	dependencies: tellPunchline(), access to keyboard
	leads to: addJoke(), return state
*/
function tellPunchline() {

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
