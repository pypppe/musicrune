const audio = document.getElementById('audio-player');
const npTitle = document.getElementById('np-title');
const npArtist = document.getElementById('np-artist');
const progressBar = document.getElementById('progress-bar');
const playPauseBtn = document.getElementById('play-pause-btn');
const loopMainBtn = document.getElementById('loop-main-btn');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume-slider');

let songs = Array.from(document.querySelectorAll('.song'));
let currentIndex = -1;

function formatTime(sec) {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function updateTime() {
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration || 0);
}

function togglePlayPause() {
    if (audio.paused && audio.src) {
        audio.play().catch(err => console.log(err));
        playPauseBtn.textContent = '⏸️';
    } else {
        audio.pause();
        playPauseBtn.textContent = '▶️';
    }
}

function resetSongLoopButtons() {
    songs.forEach(song => {
        const loopBtn = song.querySelector('.loop-btn');
        loopBtn.classList.remove('loop-active');
    });
}

function playSong(index) {
    if (index < 0 || index >= songs.length) return;

    songs.forEach(s => s.classList.remove('active-song'));
    resetSongLoopButtons();

    const song = songs[index];
    const src = song.getAttribute('data-src');
    const title = song.querySelector('.song-title').textContent;
    const artist = song.querySelector('.song-artist').textContent;

    audio.src = src;
    audio.currentTime = 0;
    audio.loop = false;
    loopMainBtn.classList.remove('active');

    audio.play().catch(err => console.log(err));
    playPauseBtn.textContent = '⏸️';

    npTitle.style.opacity = 0;
    npArtist.style.opacity = 0;
    setTimeout(() => {
        npTitle.textContent = title;
        npArtist.textContent = artist;
        npTitle.style.opacity = 1;
        npArtist.style.opacity = 1;
    }, 150);

    song.classList.add('active-song');
    currentIndex = index;
}

loopMainBtn.addEventListener('click', () => {
    audio.loop = !audio.loop;
    loopMainBtn.classList.toggle('active', audio.loop);
    if (currentIndex >= 0) {
        const loopBtn = songs[currentIndex].querySelector('.loop-btn');
        loopBtn.classList.toggle('loop-active', audio.loop);
    }
});

songs.forEach((song, i) => {
    const btn = song.querySelector('.play-btn');
    const loopBtn = song.querySelector('.loop-btn');

    btn.addEventListener('click', () => playSong(i));

    loopBtn.addEventListener('click', () => {
        audio.loop = !audio.loop;
        resetSongLoopButtons();
        loopBtn.classList.toggle('loop-active', audio.loop);
        loopMainBtn.classList.toggle('active', audio.loop);
    });
});

audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = percent + '%';
        updateTime();
    }
});

document.querySelector('.progress-container').addEventListener('click', e => {
    const width = e.currentTarget.clientWidth;
    const clickX = e.offsetX;
    if (audio.duration) audio.currentTime = (clickX / width) * audio.duration;
});

playPauseBtn.addEventListener('click', togglePlayPause);

document.getElementById('next-btn').addEventListener('click', () => {
    playSong((currentIndex + 1) % songs.length);
});
document.getElementById('prev-btn').addEventListener('click', () => {
    playSong((currentIndex - 1 + songs.length) % songs.length);
});

volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
});

const searchInput = document.getElementById('song-search');
const songs = document.querySelectorAll('.song');

searchInput.addEventListener('input', () => {
    const filter = searchInput.value.toLowerCase();

    songs.forEach(song => {
        const text = song.innerText.toLowerCase();
        
        if (text.includes(filter)) {
            song.style.display = "flex"; 
        } else {
            song.style.display = "none";
        }
    });
});
