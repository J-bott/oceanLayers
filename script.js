

document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript is working!");

    const burgerButton = document.getElementById("burger");
    const burgerMenu = document.getElementById("burgermenu");
    const soundControlButton = document.getElementById('sound-control');
    const audioElement = document.getElementById('background-audio');
    const logoNav = document.getElementById('logo-nav');
    const soundWave = document.getElementById('sound-gif');
    const bodyElement = document.body;
    const endButton = document.querySelector('.video-button');
    const finalVideo = document.getElementById('final-video');
    const finalVideoContainer = document.querySelector('.final-video-container');

    // play video show div; hide div after video
    endButton.addEventListener('click', () => {
        finalVideo.play();
        finalVideoContainer.style.visibility = 'visible';
    })
    finalVideo.addEventListener('ended', function() {
        finalVideoContainer.style.visibility = 'hidden';
        
    });


    let isMainPage = true;


    window.addEventListener('scroll', () => {
        // hide logo on nav
        if (window.scrollY > window.innerHeight) {
            logoNav.style.opacity = 1;
            console.log('Opacity set to 1');
        } else {
            logoNav.style.opacity = 0;
            console.log('Opacity set to 0');
        }
        if (window.scrollY === 0) {
            isMainPage = true;
        }
        const scrollTop = window.screenY || document.documentElement.scrollTop;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

        // Calculate pressure
        const pressureAtDepth = 1 + (scrollTop / maxScroll) * (1100 - 1);

        // remove nav at top
        var navLogo = document.querySelector('.logo-nav');
        var atm = document.querySelector('.atm');
        if (window.scrollY > 300){
            navLogo.style.opacity = 1;
            atm.style.opacity = 1;
            soundWave.style.opacity = 1;
        } else {
            navLogo.style.opacity = 0;
            atm.style.opacity = 0;
            soundWave.style.opacity = 0;
        }

        // Update the indicator height and atm span
        document.querySelector('.indicator').style.height = (scrollTop / maxScroll * 100) + '%';
        document.getElementById('atm').innerText = pressureAtDepth.toFixed(2);
    });

    // pop burger menu
    let menupop = false;
    burgerButton.addEventListener("click", function() {
        if (menupop) {
            burgerMenu.style.display = "none";
        } else {
            burgerMenu.style.display = "block";
        }
        menupop = !menupop;
    });
    // mute control
    soundControlButton.addEventListener('click', () => {
        audioElement.muted = !audioElement.muted;
    });

    const diveButton = document.getElementById('dive');
    const divs = document.querySelectorAll('.container-zone01');
    let currentIndex = 0;

    diveButton.addEventListener('click', () => {

        bodyElement.style.overflow = 'visible';
        if(isMainPage){
            isMainPage = false;
            divs[0].scrollIntoView({behavior: 'smooth'});
            bodyElement.style.overflow = 'visible';
            audioElement.play();
        } else if(currentIndex > 5){
            alert('video')
        }
        else{
            currentIndex = (currentIndex + 1) % divs.length;
            divs[currentIndex].scrollIntoView({ behavior: 'smooth' });
        }

    });

});





