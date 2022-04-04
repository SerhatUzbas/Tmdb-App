import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../Store/Context";

const Movie = (props) => {
  const [movieData, setMovieData] = useState(false);
  let { movieId } = useParams();
  const authCtx = useContext(AuthContext);
  console.log(movieId);
  console.log(authCtx.userList);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=211db75b256392ca8aebd95022305dda&language=en-US`
      );
      const rawdata = await response.json();
      const data = {
        title: rawdata.title || "No data",
        id: rawdata.id || "No data",
        genres: rawdata.genres || "No data",
        tagline: rawdata.tagline || "Story",
        overview: rawdata.overview || "No data",
        vote: rawdata.vote_average || "No data",
        productors: rawdata.production_companies || "No data",
        time: rawdata.runtime,
        revenue: rawdata.revenue,
        image: rawdata.poster_path
          ? `https://image.tmdb.org/t/p/w1280/${rawdata.poster_path}`
          : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg",
        backdrop: rawdata.backdrop_path
          ? `https://image.tmdb.org/t/p/w1280/${rawdata.backdrop_path}`
          : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg",
        relDate: rawdata.release_date || "No data",
        bookmarked: authCtx.userList.some((movie) =>
          movie.data.title === rawdata.title ? true : false
        ),
      };
      console.log(rawdata);

      setMovieData(data);
      authCtx.setBackdrop(data.backdrop);
    };
    fetchMovie();
  }, [movieId, authCtx.userList]);

  //   const all =
  //     document.querySelector(".container") || document.getElementById("root");

  //   all.style.backgroundImage =
  //     `linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 100%),url(${movieData.backdrop})` ||
  //     null;
  //   all.style.backgroundSize = "contain" || null;
  //   useEffect(() => {

  //   }, []);

  return (
    <>
      <img src={movieData.image} alt='movie poster' className='movie-img' />
      <div className='movcont'>
        <h1 className='title'>{movieData.title}</h1>
        <h3 className='tagline'>{movieData.tagline}</h3>
        <h4 className='story'>{movieData.overview}</h4>
        <ul className='genres'>
          {movieData.genres &&
            movieData.genres.map((genre) => (
              <li key={Math.random().toString()} className='genre'>
                {genre.name}
              </li>
            ))}
        </ul>
        <ul className='productors'>
          {movieData.productors &&
            movieData.productors.map((productor) => (
              <li key={Math.random().toString()} className='productor'>
                {productor.name}
              </li>
            ))}
        </ul>
        <div className='sub-cont'>
          <div className='infos'>
            <h4 className='text-title'>Original Release:</h4>
            <h2 className='text-content'>{movieData.relDate}</h2>
          </div>
          <div className='infos'>
            <h4 className='text-title'>Running Time:</h4>
            <h2 className='text-content'>{movieData.time} mins</h2>
          </div>
        </div>
        <div className='sub-cont'>
          <div className='infos'>
            <h4 className='text-title'>Box Office:</h4>
            <h2 className='text-content'>$ {movieData.revenue}</h2>
          </div>
          <div className='infos'>
            <h4 className='text-title'>Vote Average:</h4>
            <h2 className='text-content'>{movieData.vote}</h2>
          </div>
        </div>
        {movieData.bookmarked === false ? (
          <div
            className='add-but-true'
            onClick={() => authCtx.addData(movieData)}
          >
            Add to List
          </div>
        ) : (
          <div
            className='add-but-false'
            onClick={() => authCtx.deleteData(movieData)}
          >
            In my list
          </div>
        )}
      </div>
    </>
  );
};

export default Movie;
