//initialising
const synth = window.speechSynthesis;

//DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector("#text-input");
const ratevalue = document.querySelector("#rate-value");
const rate = document.querySelector("#rate");
const pitchValue = document.querySelector("#pitch-value");
const pitch = document.querySelector("#pitch");
const selectVoice = document.querySelector("#select-voice");
// document.querySelector() simillar to document.getElementById()

var voices=[];
function gettingVoices(){
    voices = synth.getVoices();
    voices.forEach(function(voice){
        var opt = document.createElement("option");
        opt.textContent = voice.name +"( "+voice.lang+")";
        opt.setAttribute("s",voice.name);
        opt.setAttribute("data-lang",voice.lang);
        selectVoice.appendChild(opt);
    });
    
}
gettingVoices();
if(synth.onvoiceschanged!==undefined){
    synth.onvoiceschanged = gettingVoices;
}
function speak()
{
if(synth.speaking){
    console.error("Already speaking");
}
if(textInput.value!=null){
    var speakText = new SpeechSynthesisUtterance(textInput.value);
    
    speakText.onend = e =>{
        console.log('Speaking over');
    }
    speakText.onerror = e =>{
        console.error("Error occured");
    }

}
var selectedvoice = selectVoice.value;
voices.forEach(voice=>{
    if(voice.name===selectedvoice){
        speakText.voice=voice;
    }
});
    speakText.rate=rate.value;
    speakText.pitch=pitch.value;
    synth.speak(speakText);
}

//Event Listeners

textForm.addEventListener('submit',e=>{
    e.preventDefault();
    speak();
    textInput.blur();
});

rate.addEventListener('change',e=>ratevalue.textContent=rate.value);
pitch.addEventListener('change',e=>pitchValue.textContent=pitch.value);
selectVoice.addEventListener('change',e=>speak());