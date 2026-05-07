
const accessToken = import.meta.env.VITE_TMBD_TOKEN;
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export async function fetchMovie(endpoint) {

    console.log('Token:', accessToken)
    console.log('Base URL:', baseUrl)

    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        });

        if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // return data.results;

        const trailer = data.results.find(vid => 
            vid.type === 'Trailer' &&
            vid.site === 'YouTube' &&
            vid.official === true
        )

        const fallback = data.results.find(vid => vid.site === 'YouTube');

        return trailer?.key || fallback?.key || null;

    } catch (error) {
        console.error('Fetch failed', error.message);
        throw error;
    }
}

export async function fetchMovieVideos(movieId) {

    console.log('movieId:', movieId)

    try {
        const response = await fetch(`${baseUrl}/movie/${movieId}/videos`, {
            headers: { Authorization: `Bearer ${accessToken}`}
        });

        if(!response.ok) throw new Error(`HTTP error! ${response.status}`);

        const data = await response.json();
        const trailer = data.results.find(vid => vid.type === 'Trailer' && vid.site === 'YouTube');
        return trailer?.key || null;

    } catch (error) {
        console.error('Fetch failed:', error.message);
    }
}