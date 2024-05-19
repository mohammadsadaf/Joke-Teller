const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable button
function toggleButton(){
    button.disabled = !button.disabled;
}


// Passing joke to VoiceRSS API
function tellMe(joke){
        VoiceRSS.speech({
        key: 'a521f5eabd5c4e288cf109eb6baf0e90',
        src: joke,
        hl: 'en-us',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stero',
        ssml:false, 
    });
}


// Get Jokes from joke API
async function getJokes(){
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

    try{
        const res = await fetch(apiUrl);
        const data = await res.json();

        if (data.setup){
            joke = `${data.setup} ... ${data.delivery}`;
        }else{
            joke = data.joke;
        }
        // Text-to-speech
        tellMe(joke);

        //Disable button
        toggleButton();
    }catch(error){
        // Catch errors here
        console.log('Whoops', error);
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);