console.log("Welcome to Spotify");

//Initialize the variable
let songIndex = 0;

let audioElement = new Audio('songs/RewriteTheStars.mp3');

let masterPlay = document.getElementById('masterPlay');

let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Rewrite The Stars", filePath: "songs/RewriteTheStars.mp3", coverPath: "covers/RewriteTheStars.jpg" },

    { songName: "Love Story", filePath: "songs/LoveStory.mp3", coverPath: "covers/Taylor Swift - Love Story.jpg" },

    { songName: "A Thousand Years", filePath: "songs/AThousandYears.mp3", coverPath: "covers/Christina Perri - A Thousand Years.jpg" },

    { songName: "Golden Hour", filePath: "songs/GoldenHour.mp3", coverPath: "covers/JVKE - Golden Hour.jpg" },

    { songName: "Story of my Life", filePath: "songs/StoryofMyLife.mp3", coverPath: "covers/One direction - Story of My Life.jpg" },

    { songName: "See You Again", filePath: "songs/SeeYouAgain.mp3", coverPath: "covers/Wiz Khalifa - See You Again.jpg" },
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
}) 
//audioElement.play();

// Play and Pause function
function playPauseSong(isPlaying) {
    if (isPlaying) {
        audioElement.play();
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        gif.style.opacity = 0;
    }
}

//handle Play/Pause Click
masterPlay.addEventListener('click', () => {
    const isPlaying = !audioElement.paused && audioElement.currentTime > 0;
    playPauseSong(!isPlaying);
    masterPlay.classList.toggle('fa-play-circle');
    masterPlay.classList.toggle('fa-pause-circle');
})

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        songIndex = parseInt(e.target.id);
        playPauseSong(true);
        audioElement.src = songs[songIndex].filePath; // Corrected line
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        e.target.classList.toggle('fa-play-circle');
        e.target.classList.toggle('fa-pause-circle');
    })
})

// Listen to events
audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate');
    // Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})


myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filePath; // Corrected line
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath; // Corrected line
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath; // Corrected line
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
})