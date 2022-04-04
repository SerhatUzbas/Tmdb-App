import { useContext } from "react";
import AuthContext from "../Store/Context";
import ListItem from "./ListItem";

const Mylist = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className='list-contt'>
      {authCtx.userList &&
        authCtx.userList.map((mov) => (
          <ListItem
            key={Math.random().toString()}
            image={mov.data.image}
            id={mov.data.id}
          />
        ))}
    </div>
  );
};

export default Mylist;
