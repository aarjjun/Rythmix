from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

GENIUS_API_TOKEN = 'hT6DKhh2MiKPZXrFo30c5ohCzCOSQy5KzpEzFW86o3fX4B9rt9YBsTbIDjqLrLLe'

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/search', methods=['GET'])
def search_song():
    query = request.args.get('query')
    url = f'https://api.genius.com/search?q={query}'
    headers = {'Authorization': f'Bearer {GENIUS_API_TOKEN}'}

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise an exception for bad status codes
        data = response.json()
        
        songs = []
        if 'response' in data and 'hits' in data['response']:
            for hit in data['response']['hits']:
                song_info = hit['result']
                song_details = {
                    'title': song_info['title'],
                    'url': song_info['url'],
                    'image_url': song_info['primary_artist']['image_url'],
                    'artist': song_info['primary_artist']['name'],
                    'album': song_info.get('album', {}).get('name', 'N/A'),
                    'release_date': song_info.get('release_date', 'N/A'),
                    'description': song_info.get('description', {}).get('plain', 'No description available'),
                    'lyrics_state': song_info.get('lyrics_state', 'N/A'),
                    'path': song_info['path']
                }
                songs.append(song_details)
        
        return jsonify(songs)
    except requests.RequestException as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
