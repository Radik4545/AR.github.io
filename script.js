let buttonEnter = document.getElementById("buttonEnter");
let uiDivIn = document.getElementById("uiDivIn");
let buttonSoundOn = document.getElementById("buttonSoundOn");
let buttonSoundOff = document.getElementById("buttonSoundOff");
let subtitlesTextArr = [
    [6, 8, "And now"],
    [8, 11, "The end is near"],
    [11.6, 14.6, "And so I face"],
    [14.6, 21, "The final curtain, my friend"],
    [21, 23, "I'll say it clear"],
    [24, 30, "I'll state my case, of which I'm certain"],
    [31, 36, "I've lived. A life that's full"],
    [36.5, 45.5, "I traveled each and every highway and more"],
    [45.5, 48.5, "Much more than this"],
    [48.6, 52.6, "I did it my"],
    [53.6, 57.6, "Way. Regrets."],
    [58.5, 61, "I've had a few"],
    [62, 63.5, "But then again"],
    [65.3, 67.7, "Few to mention"],
    [68.5, 70, "I did"]
];
let lenghSubtitlesTextArr = 14;
let number = 0;
let audio = document.getElementById("audio");
let subtitles = document.getElementById("subtitles");
let stopSubtitels = false;
let timeJump = subtitlesTextArr[0][0];
let isSubtitlesOn = false;
let isClassSubtitlesOn = false;
let time = 0;
subtitles.innerHTML = "";
let checkTimeSubtitles = function () {
    let timerId = setTimeout(function IncheckTimeSubtitles()
    {
        if (number > lenghSubtitlesTextArr)
        {
            stopSubtitels = true;
        }
        if (!stopSubtitels) 
        {
            time = document.getElementById('audio').currentTime;
            let currentTimeAudiotext = subtitlesTextArr[number];
            if (time >= currentTimeAudiotext[0]) 
            {
                if (!isClassSubtitlesOn) 
                {
                    isClassSubtitlesOn = true;
                    
                    if (isSubtitlesOn) 
                    {
                        subtitles.setAttribute("class", "subtitles");
                    }
                }
                timeJump = (currentTimeAudiotext[1] - time) * 1000;
                subtitles.innerHTML = currentTimeAudiotext[2];
                number++;
            } 
            else if (time < currentTimeAudiotext[0]) 
            {
                isClassSubtitlesOn = false
                timeJump = (currentTimeAudiotext[0] - time) * 1000;
                if (isSubtitlesOn) 
                {
                    subtitles.removeAttribute("class");
                }
            }    
        }       
        if (!stopSubtitels) 
        {
            timerId = setTimeout(checkTimeSubtitles(), timeJump);
        } 
        else 
        {
            clearTimeout(timerId);
            stopSubtitels = true;
            subtitles.innerHTML = "";
            subtitles.removeAttribute("class");
        }
    }, timeJump)
}
let fadeSwitch = function () {
    if (isSubtitlesOn) 
    {
        buttonSoundOn.setAttribute("class", "displayNone");
        buttonSoundOff.setAttribute("class", "pictureSoundOFF");
        isSubtitlesOn = true;
    } 
    else 
    {
        buttonSoundOff.setAttribute("class", "displayNone");
        buttonSoundOn.setAttribute("class", "pictureSoundON");
        isSubtitlesOn = false;
    }
}
AFRAME.registerComponent("cursor-listener", 
{
    init: function () 
    {
        let colorBlue = "blue";
        let model = document.querySelector("#modelID");
        let imageButtonPlay = document.getElementById("imageButtonPlay");
        let volumeSound = 0;
        let imageLoaded = document.getElementById("imageLoaded");
        let cursor = document.getElementById("cursor");
        let textLOADING = document.getElementById("textLOADING");
        this.el.addEventListener('mouseenter', function() 
        {
            this.setAttribute('scale', "1.6 1.6 1.6");
        });
        this.el.addEventListener('mouseleave', function() 
        {
            this.setAttribute('scale', "1.5 1.5 1.5");
        });
        this.el.addEventListener('click', function() 
        {
            this.setAttribute('material', 'color', colorBlue);
            setTimeout(document.getElementById('audio').play(), 450);
            this.emit("start2");
            this.emit("start3");
            model.emit("start1");
            model.setAttribute("class", "data-raycastable");
            this.removeAttribute("class");
            model.setAttribute("animation-mixer", "clip: *");
            number = 0;
            checkTimeSubtitles();
        });
        model.addEventListener("model-loaded",  function () 
        {
            imageLoaded.emit("start6");
            textLOADING.parentNode.remove(textLOADING);
            setTimeout(() => 
            {
                model.setAttribute("visible", "true");
            }, 4500);
            setTimeout(() => 
            {
                imageLoaded.parentNode.remove(imageLoaded);
                cursor.parentNode.remove(imageLoaded);
                imageButtonPlay.setAttribute("visible", "true");
                imageButtonPlay.setAttribute("class", "data-raycastable");
            }, 6000);
        });
        model.addEventListener("click", function () 
        {
            console.log("why not");
            this.setAttribute("rotation", "0 -90 0");
            let colorWhite = "white";
            document.getElementById('audio').pause();
            document.getElementById('audio').currentTime = 0;
            imageButtonPlay.setAttribute("class", "data-raycastable");
            imageButtonPlay.setAttribute('scale', "1.5 1.5 1.5");
            imageButtonPlay.setAttribute('material', 'color', colorWhite);
            this.removeAttribute("class");
        });
        buttonSoundOn.addEventListener('mousedown', function() 
        {
            volumeSound = document.getElementById('audio').volume;
            document.getElementById('audio').volume = 0;
            isSubtitlesOn = true;
            if (isClassSubtitlesOn) 
            {
                subtitles.setAttribute("class", "subtitles");
                isClassSubtitlesOn = true;
            }
            fadeSwitch()
        });  
        buttonSoundOff.addEventListener('mousedown',  function() 
        {
            document.getElementById('audio').volume = volumeSound;
            isSubtitlesOn = false;
            subtitles.removeAttribute("class");
            fadeSwitch();
        });  
    }
})
let uiDiv = document.getElementById("uiDiv");
uiDiv.style["pointer-events"] = "auto";
buttonEnter.style.cursor = "pointer";
let uiDivImageSoundOnOff = document.getElementById("divImageSoundOnOff");
let fadeIn = function() 
{
    uiDiv.style["pointer-events"] = "none";
    buttonEnter.parentNode.remove(buttonEnter);
    uiDiv.style["backdrop-filter"] = "none";
    uiDiv.style["transition"] = "background-color 1000ms linear";
    uiDiv.setAttribute("class", "displayNone");
    let aScene = document.querySelector("#aScene");
    aScene.setAttribute("visible", "true");
    uiDivImageSoundOnOff.style["pointer-events"] = "auto";
    buttonSoundOn.style.cursor = "pointer";
    buttonSoundOff.style.cursor = "pointer";
    fadeSwitch();
}

buttonEnter.addEventListener('touchstart', fadeIn);
buttonEnter.addEventListener('mousedown',  fadeIn);  
