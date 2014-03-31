window.onload = newgame;
window.onpopstate = popState;
var state, ui;

function newgame(playagain){
	ui = {
		heading: null,
		prompt: null,
		input: null,
		low: null,
		mid: null,
		high: null
	};
	//
	for(var id in ui){
		ui[id] = document.getElementById(id);
	}
	//
	ui.input.onchange = handleGuess;
	//
	state = {
		n: Math.floor(99 * Math.random()) + 1,
		low: 0,
		high: 100,
		guessnum: 0,
		guess: undefined
	};
	//
	display(state);
}

function save(sate){
	if (!history.pushState){
		return;
	}
}

function popState(event){
	if (event.state){
		state = event.state;
		display(state);
	} else {
		history.replaceState(state, "", "#guess" + state.guessnum);
	}
}

function handleGuess(){
	var g = parseInt(this.value);
	if ((g > state.low) && (g < state.high)){
		if (g < state.n) { 
			state.low = g;
		} else if (g > state.n) {
			state.higt = g;
		}
		state.guess = g;
		state.guessnum++;
		save(state);
		display(state);
	} else {
		alert("Please enter a number greater than " + state.low +
			  " and less than " + state.high);
	}
}

function display(state){
	ui.heading.innerHTML = document.title = 
		"I'm thinking of a number between " +
		state.low + " and " + state.high + ".";
		ui.low.style.width = state.low + "%";
		ui.low.style.width = (state.high-state.low) + "%";
		ui.high.style.width = (100 - state.high) + "%";
		ui.input.style.visibility = "visible";
		ui.input.value = "";
		ui.input.focus();
		//
		if (state.guess === undefined){
			ui.prompt.innerHTML = "Type your guess and hit Enter:";
		} else if(state.guess < state.n){
			ui.prompt.innerHTML = state.guess + " is too low. Guess again: ";
		} else if(state.guess > state.n){
			ui.prompt.innerHTML = state.guess + " is too high. Guess again: ";
		} else {
			ui.input.style.visibility = "hidden";
			ui.heading.innerHTML = document.title = state.guess + " is correct!";
			ui.prompt.innerHTML = "You Win! <button onclick='newgame(true)'>Play Again</button>";
		}
}












