document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const player = document.querySelector('.cassette-player');
    const audio = new Audio();
    const playBtn = document.querySelector('.play-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const progressContainer = document.querySelector('.progress-container');
    const progress = document.querySelector('.progress');
    const currentTimeEl = document.querySelector('.current-time');
    const durationEl = document.querySelector('.duration');
    const songTitleEl = document.querySelector('.song-title');
    const artistEl = document.querySelector('.artist');
    const playlistItems = document.querySelectorAll('.playlist-item');
    const equalizer = document.querySelector('.equalizer');
    
    // Current song index
    let currentSongIndex = 0;
    
    // Initialize the player with the first song
    function loadSong(songIndex) {
        const song = playlistItems[songIndex];
        audio.src = song.getAttribute('data-src');
        songTitleEl.textContent = song.getAttribute('data-title');
        artistEl.textContent = song.getAttribute('data-artist');
        
        // Update active class in playlist
        playlistItems.forEach(item => item.classList.remove('active'));
        song.classList.add('active');
        
        // Play the song
        audio.play();
        player.classList.add('playing');
        player.classList.remove('paused');
        playBtn.textContent = '❚❚';
        
        // Reset animation
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.animation = 'none';
            void bar.offsetWidth; // Trigger reflow
            bar.style.animation = null;
        });
    }
    
    // Play or pause the song
    function togglePlay() {
        if (player.classList.contains('playing')) {
            audio.pause();
            player.classList.remove('playing');
            player.classList.add('paused');
            playBtn.textContent = '▶';
        } else {
            audio.play();
            player.classList.add('playing');
            player.classList.remove('paused');
            playBtn.textContent = '❚❚';
        }
    }
    
    // Update progress bar
    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        
        // Update time display
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
        
        // Avoid NaN display
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
    
    // Set progress when clicked on progress bar
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }
    
    // Next song
    function nextSong() {
        currentSongIndex++;
        if (currentSongIndex > playlistItems.length - 1) {
            currentSongIndex = 0;
        }
        loadSong(currentSongIndex);
    }
    
    // Previous song
    function prevSong() {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = playlistItems.length - 1;
        }
        loadSong(currentSongIndex);
    }
    
    // Play selected song from playlist
    function playSelectedSong(e) {
        currentSongIndex = Array.from(playlistItems).indexOf(e.currentTarget);
        loadSong(currentSongIndex);
    }
    
    // Event listeners
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextSong);
    progressContainer.addEventListener('click', setProgress);
    playlistItems.forEach(item => item.addEventListener('click', playSelectedSong));
    
    // Load the first song
    loadSong(currentSongIndex);
    
    // Random equalizer effect
    function randomizeEqualizer() {
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => {
            const randomHeight = Math.floor(Math.random() * 80) + 20;
            bar.style.height = `${randomHeight}%`;
        });
    }
    
    // Only randomize when playing
    audio.addEventListener('play', () => {
        equalizerInterval = setInterval(randomizeEqualizer, 200);
    });
    
    audio.addEventListener('pause', () => {
        clearInterval(equalizerInterval);
    });
    
    let equalizerInterval;
});