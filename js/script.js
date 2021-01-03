const button = document.getElementById('button');
const speechBubble = document.getElementById('speech-bubble');
const audioElement = document.getElementById('audio');


// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}
function toggleBubble() {
    speechBubble.hidden = !speechBubble.hidden;
}
//Passing Joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: 'b6a710d174f547e480c3fb3e6dbbca9c',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

//Get jokes from API
async function getJokes(){
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke
        }
        //Text-to-Speech
        tellMe(joke);
        //Put the text in the bubble
        speechBubble.textContent = joke
        //Disable Button
        toggleButton();
        //Show Soeech Bubble
        toggleBubble();
    } catch (error) {
        console.log('Ups, an error ocurred', error); 
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
audioElement.addEventListener('ended', toggleBubble);
