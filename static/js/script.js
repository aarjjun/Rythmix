document.getElementById('inputForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const userInput = document.getElementById('userInput').value.trim();
    searchSong(userInput);
});

function searchSong(query) {
    fetch(`/search?query=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            const output = document.getElementById('output');
            const songDetails = document.getElementById('songDetails');
            const songImage = document.getElementById('songImage');
            const songTitle = document.getElementById('songTitle');
            const songArtist = document.getElementById('songArtist');
            const songAlbum = document.getElementById('songAlbum');
            const songReleaseDate = document.getElementById('songReleaseDate');
            const songLink = document.getElementById('songLink');

            output.innerHTML = ''; // Clear previous output
            songDetails.style.display = 'none'; // Hide details initially

            if (data.length > 0) {
                const song = data[0];
                songTitle.textContent = `Title: ${song.title}`;
                songArtist.textContent = `Artist: ${song.artist}`;
                songAlbum.textContent = `Album: ${song.album}`;
                songReleaseDate.textContent = `Release Date: ${song.release_date}`;
                songImage.src = song.image_url;
                songLink.href = song.url;

                songDetails.style.display = 'block'; // Show song details
            } else {
                output.innerHTML = '<p>Sorry, no matching song found.</p>';
                songDetails.style.display = 'none'; // Hide details if no song found
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('output').innerHTML = '<p>An error occurred while fetching the song details.</p>';
        });
}
