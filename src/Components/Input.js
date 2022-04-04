import { useState, useCallback, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import ArrowKeyNavigation from "boundless-arrow-key-navigation";

const Input = (props) => {
  const [searchData, setSearchData] = useState(false);
  const queryRef = useRef();
  let navigate = useNavigate();

  const fetchSearch = useCallback(async (query) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=211db75b256392ca8aebd95022305dda&language=en-US&query=${query}&page=1&include_adult=false`
      );
      const rawdata = await res.json();
      const pureData = rawdata.results.filter(
        (movie) => movie.media_type !== "person"
      );
      const data = pureData.map((movie) => ({
        title: movie.title || movie.name || "No data",
        id: movie.id || "No data",
        type: movie.media_type || "No data",
        overview: movie.overview || "No data",
        vote: movie.vote_average || "No data",
        image: movie.poster_path
          ? `https://image.tmdb.org/t/p/w185/${movie.poster_path}`
          : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg",

        relDate: movie.release_date || "No data",
        // bookmarked: curState.some((mov) => movie.id === mov.id)
        //   ? true
        //   : false,
      }));
      setSearchData(data);
    } catch (error) {}
  }, []);

  const submitHandler = () => {
    const searchQuery = queryRef.current.value;
    console.log(searchQuery);
    if (searchQuery.length > 0) {
      fetchSearch(searchQuery);
    } else setSearchData([]);
  };

  const navigator = (id) => {
    navigate(`${id}`);
    queryRef.current.value = "";
    setSearchData(false);
  };

  const root = document.getElementById("root");
  root.addEventListener("click", (e) => {
    e.preventDefault();
    if (!e.target.classList.contains(".searchlist")) {
      setSearchData(false);
    }
  });

  return (
    <>
      <form className='search-form' onChange={submitHandler}>
        <input
          className='search-input'
          type='text'
          ref={queryRef}
          placeholder='Search Movie...'
        />
        <div className='searchlist'>
          {searchData &&
            searchData.map((movie) => (
              <h3
                className='searchresult'
                onClick={() => navigator(movie.id)}
                key={Math.random().toString()}
              >
                {movie.title}
              </h3>
            ))}
        </div>
      </form>
    </>
  );
};
export default Input;
