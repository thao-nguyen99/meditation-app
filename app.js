function app(){
    const play=document.querySelector(".play");
    const song=document.querySelector(".song");
    const outline=document.querySelector(".moving-outline > circle");
    const video=document.querySelector(".vid-container > video");
    // sound
    const sounds=document.querySelectorAll('.sound-picker button');
    // time display
    const timeDisplay=document.querySelector('.time-display');
    // get the length of outline
    const outlineLength=outline.getTotalLength();
    // Duration
    let fakeDuration=5;
    outline.style.strokeDasharray=outlineLength;
    outline.style.strokeDashoffset=outlineLength;
    play.addEventListener('click', ()=>{
     checkPlaying (song);
    });
    
    //time selector
    const timeSelect=document.querySelectorAll(".time-selector button");
    timeSelect.forEach(function time(option) {
        option.addEventListener('click',function(){
            fakeDuration = this.getAttribute ("data-time");
            timeDisplay.textContent=`${Math.floor(fakeDuration/ 60)}:${Math.floor(fakeDuration % 60)}`;
        });
    });
    // sound picker
    sounds.forEach(sound=>{
        sound.addEventListener('click', function(){
            video.src=this.getAttribute('data-video');
            song.src=this.getAttribute('data-sound');
            checkPlaying();
        } );
    });


    // function to play and pause

    function checkPlaying(song){
     if (song.paused){
      song.play();
      video.play();
      play.src="./svg/pause.svg";
     } else{
      song.pause();
      video.pause();
      play.src="./svg/play.svg";
     }
    };

    //animate the circle

    song.ontimeupdate=function(){
     let currentTime=song.currentTime;
     let elapsed=fakeDuration-currentTime;
     let mins=Math.floor(elapsed/60);
     let secs=Math.floor(elapsed%60);

     timeDisplay.textContent=`${mins}:${secs}`;
     let progress = outlineLength -(currentTime / fakeDuration)* outlineLength;
     outline.style.strokeDashoffset = progress;

     // 

     if (currentTime> fakeDuration){
          song.pause();  
          song.currentTime=0;
          play.src="./svg/play.svg";
          video.pause();
    }
    };
};

app();