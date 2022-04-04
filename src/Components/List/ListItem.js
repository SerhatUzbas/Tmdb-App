import { useNavigate } from "react-router-dom";

const ListItem = (props) => {
  let navigate = useNavigate();
  const navigator = (id) => {
    navigate(`/Home/${id}`);
  };
  return (
    <div className='list-movie' onClick={() => navigator(props.id)}>
      <img src={props.image} alt={props.title} className='list-movie-image' />
    </div>
  );
};

export default ListItem;
