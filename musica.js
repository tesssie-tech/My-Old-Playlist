// Welcome screen functionality
document.addEventListener('DOMContentLoaded', function() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const enterBtn = document.getElementById('enterBtn');
    const loadingProgress = document.getElementById('loadingProgress');
    const musicPlayer = document.getElementById('musicPlayer');
    
    // Auto-load after 5 seconds
    let loadInterval = setInterval(() => {
        const currentWidth = parseInt(loadingProgress.style.width) || 0;
        const newWidth = currentWidth + 1;
        loadingProgress.style.width = `${newWidth}%`;
        
        if (newWidth >= 100) {
            clearInterval(loadInterval);
            enterPlayer();
        }
    }, 50);
    
    // Manual enter button
    enterBtn.addEventListener('click', function() {
        clearInterval(loadInterval);
        enterPlayer();
    });
    
    function enterPlayer() {
        welcomeScreen.classList.add('hidden');
        musicPlayer.style.display = 'block';
        
        // Start your player initialization here
        // Example: loadSong(0);
        
        // Remove welcome screen from DOM after transition
        setTimeout(() => {
            welcomeScreen.remove();
        }, 1000);
    }
});
