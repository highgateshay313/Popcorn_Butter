
import { useState, useEffect } from 'react';
import styles from './Featured.module.css';
import NowPlaying from '../NowPlaying/NowPlaying';
import { fetchMovieVideos } from '../../api/api';

export function Featured({featured}) {

    const [videoKey, setVideoKey] = useState(null);

    useEffect(() => {
        if (!featured?.id) return;

        async function loadVideo() {
            const key = await fetchMovieVideos(featured.id)
            setVideoKey(key);
        }

        loadVideo()
    }, [featured])

    if (!videoKey) return <p>Loading...</p>;

    return (
        <section className={styles.featured_sec}>
            <div className={styles.featured_movie}>
                <div>

                </div>
                <iframe className={styles.vid}
                src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&loop=1&mute=0&rel=0&controls=0&playlist=${videoKey}`} 
                width='100%'
                height='700'
                allowFullScreen
                allow='autoplay'
                />
            </div>
        </section>
    )
}