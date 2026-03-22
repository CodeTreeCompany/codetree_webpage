// Progress Bar Animation
document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    let progress = 0;
    
    function updateProgress() {
        if (progress <= 85) {
            progress++;
            progressBar.style.width = progress + '%';
            progressText.textContent = progress + '%';
            setTimeout(updateProgress, 30);
        }
    }
    
    updateProgress();
});