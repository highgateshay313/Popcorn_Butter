import { useState, useEffect, useRef } from "react";
import Navigation from "../Navigation/Navigation";
import styles from "./DashBoard.module.css";
import List from "../Navigation/List";
import NowPlaying from "../NowPlaying/NowPlaying";
import { Featured } from "../Featured/Featured";

function DashBoard() {
  const [upcoming, setUpcoming] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [action, setAction] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState([]);
  const [loading, setLoading] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [featuredKey, setFeaturedKey] = useState(null);

  const featuredRef = useRef(null);

  function handleMovieSelect(key) {
    setFeaturedKey(key);
    featuredRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  const token = import.meta.env.VITE_TMBD_TOKEN;
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    async function fetchAll() {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        const [popularRes, topRatedRes, nowPlayingRes, upcomingRes] =
          await Promise.all([
            fetch(`${baseUrl}/movie/popular`, { headers }),
            fetch(`${baseUrl}/movie/top_rated`, { headers }),
            fetch(`${baseUrl}/movie/now_playing`, { headers }),
            fetch(`${baseUrl}/movie/upcoming`, { headers }),
          ]);

        const [popularData, topRatedData, nowPlayingData, upcomingData] =
          await Promise.all([
            popularRes.json(),
            topRatedRes.json(),
            nowPlayingRes.json(),
            upcomingRes.json(),
          ]);
        setPopular(popularData.results);
        setTopRated(topRatedData.results);
        setNowPlaying(nowPlayingData.results);
        setPopular(popularData.results);
        setUpcoming(upcomingData.results);
        setFeaturedMovie(popularData.results[5]);
      } catch (error) {
        console.error("Fetch failed", error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <section className={styles.dashboard_container}>
      <div className={styles.nav}>
        <Navigation logo="Popcorn🍿Butter" />
      </div>
      <div className={styles.featured_vid} ref={featuredRef}>
        <Featured featured={featuredMovie} featuredKey={featuredKey} />
      </div>
      <div className={styles.nav_list}>
        <List />
      </div>
      <div className={styles.now_playing_list}>
        <NowPlaying
          title="Now Playing"
          movies={nowPlaying}
          onMovieSelected={handleMovieSelect}
        />
      </div>
      <div className={styles.popular_list}>
        <NowPlaying
          title="Popular"
          movies={popular}
          onMovieSelected={handleMovieSelect}
        />
      </div>
      <div className={styles.top_rated}>
        <NowPlaying
          title="Top Rated"
          movies={topRated}
          onMovieSelected={handleMovieSelect}
        />
      </div>
      <div className={styles.upcoming}>
        <NowPlaying
          title="Box Office"
          movies={upcoming}
          onMovieSelected={handleMovieSelect}
        />
      </div>
    </section>
  );
}

export default DashBoard;
