
import { useState, useEffect } from 'react';
import styles from './Featured.module.css';
import NowPlaying from '../NowPlaying/NowPlaying';
import { fetchMovieVideos } from '../../api/api';

export function Featured({featured, featuredKey }) {
    const [videoKey, setVideoKey] = useState(null);
    const [defaultKey, setDefaultKey] = useState(null)

    useEffect(() => {
        if (!featured?.id) return;

        async function loadVideo() {
            const key = await fetchMovieVideos(featured.id)
            setDefaultKey(key);
        }

        loadVideo()
    }, [featured])

    const activeKey = featuredKey || defaultKey;

    if (!defaultKey) return <p>Loading...</p>;

    return (
        <section className={styles.featured_sec}>
            <div className={styles.featured_movie}>
                <div>

                </div>
               
                <iframe 
                    className={styles.vid}
                    key={activeKey}
                    src={`https://www.youtube.com/embed/${activeKey}?autoplay=1&loop=1&mute=0&rel=0&control=1&playlist=${activeKey}`}
                    width='100%'
                    height='100%'
                    allowFullScreen
                    allow='autoplay'
                />
               
                
            
            </div>
        </section>
    )
}