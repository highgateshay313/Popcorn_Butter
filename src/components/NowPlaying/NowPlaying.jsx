import { useState, useEffect } from "react";
import styles from "./NowPlaying.module.css";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { fetchMovieVideos } from "../../api/api";
import "@fontsource/nothing-you-could-do";

function NowPlaying({ title, movies = [], movieImage, onMovieSelected }) {
  console.log("Title:", title);
  const [startIndex, setStartIndex] = useState(0);
  const [visableCards, setVisableCards] = useState(
    window.innerWidth <= 600 ? 3 : 5,
  );
  //   const visableCards = 5;

  useEffect(() => {
    function handleResize() {
      setVisableCards(window.innerWidth <= 600 ? 3 : 5);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (startIndex + visableCards > movies.lenght) {
      setStartIndex(0);
    }
  }, [visableCards, movies.length]);

  async function handleMovieClick(movieId) {
    const key = await fetchMovieVideos(movieId);
    if (key) {
      onMovieSelected?.(key);
    }
  }

  // function handleClose() {
  //     // setModalOpen(false);
  //     setSelectedKey(null);
  //     onModalChange?.(false)
  // }

  function handleNext() {
    setStartIndex((prev) =>
      prev + visableCards >= movies.length ? 0 : prev + visableCards,
    );
  }

  function handlePrev() {
    setStartIndex((prev) =>
      prev - visableCards < 0 ? 0 : prev - visableCards,
    );
  }

  const visableMovies = movies.slice(startIndex, startIndex + visableCards);

  return (
    <section className={styles.nowPlaying_container}>
      <h1 className={styles.now_title}>{title}</h1>

      <div className={styles.cards_container}>
        <button className={styles.slide_button} onClick={handlePrev}>
          <MdOutlineArrowBackIos size={40} color="#21130d" />
        </button>
        {visableMovies.map((movie) => (
          <div
            onClick={() => handleMovieClick(movie.id)}
            className={styles.card}
            key={movie.id}>
            <img
              className={styles.card_img}
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
        ))}
        <button className={styles.slide_button} onClick={handleNext}>
          <MdArrowForwardIos size={40} color="#21130d" />
        </button>
      </div>
    </section>
  );
}

export default NowPlaying;
