document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('inputForm');
    const output = document.getElementById('output');
    const songDetails = document.getElementById('songDetails');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const userInput = document.getElementById('userInput').value.trim();
        
        if (userInput) {
            output.innerHTML = '<p>Searching...</p>';
            searchSong(userInput);
        }
    });

    function searchSong(query) {
        fetch(`/search?query=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                output.innerHTML = '';
                songDetails.style.display = 'none';

                if (data.error) {
                    output.innerHTML = `<p>Error: ${data.error}</p>`;
                    return;
                }

                if (data.length > 0) {
                    const song = data[0];
                    
                    // Update song details
                    document.getElementById('songImage').src = song.image_url || '/static/images/placeholder.jpg';
                    document.getElementById('songTitle').textContent = `Title: ${song.title}`;
                    document.getElementById('songArtist').textContent = `Artist: ${song.artist}`;
                    document.getElementById('songAlbum').textContent = `Album: ${song.album}`;
                    document.getElementById('songReleaseDate').textContent = `Release Date: ${song.release_date}`;
                    document.getElementById('songLink').href = song.url;

                    // Show the song details with animation
                    songDetails.style.display = 'block';
                    songDetails.style.opacity = 0;
                    requestAnimationFrame(() => {
                        songDetails.style.opacity = 1;
                    });
                } else {
                    output.innerHTML = '<p>No matching songs found. Try a different search!</p>';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                output.innerHTML = '<p>An error occurred while searching. Please try again.</p>';
            });
    }
});