const image = document.querySelector('img');
const title = document.querySelector('#title');
const artist = document.querySelector('#artist');

const progresscontainer = document.querySelector('#progress-container');
const progress = document.querySelector('#progress');

const currentTimeEl = document.querySelector('#curren-time');
const durationEl = document.querySelector('#duration');

const music = document.querySelector('audio');
const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');

let songIndex = 0;
// Music
const songs = [
  {
    name: 'song-1',
    displayName: 'Sultan',
    artist: 'Prashanth Neel',
  },
  {
    name: 'song-2',
    displayName: 'Kaal Bhairav Ashtakam',
    artist: 'Agam',
  },
  {
    name: 'song-3',
    displayName: 'Counting Star',
    artist: 'One',
  },
];

// Check if playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'pause');
  music.play();
}
// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'play');

  music.pause();
}

//Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}
// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) songIndex = 0;
  console.log(songIndex);
  loadSong(songs[songIndex]);
  playSong();
}

// Prev Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;

  console.log(songIndex);

  loadSong(songs[songIndex]);
  playSong();
}

// On load select first song
loadSong(songs[songIndex]);

// Update Progress Bar and time
function updateProgressBar(event) {
  if (isPlaying) {
    const { duration, currentTime } = event.srcElement;

    // Update Progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    //Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;

    // Delay switching duration to avoid NAN
    if (durationSeconds)
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;

    //Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;

    // Delay switching currentTime to avoid NAN
    if (currentSeconds)
      currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Play & Pause event listener
playBtn.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong();
});
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
