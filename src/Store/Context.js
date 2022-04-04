import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyBjD5LcKSux2BKbramC4k0H-arZ17KGmSg",
  authDomain: "unipro-2355f.firebaseapp.com",
  projectId: "unipro-2355f",
  storageBucket: "unipro-2355f.appspot.com",
  messagingSenderId: "914757176558",
  appId: "1:914757176558:web:ba7f0d40f7baac665237ff",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

const AuthContext = React.createContext({
  user: "",
  userList: false,
  logginout: () => {},
  logginin: () => {},
  setBack: () => {},
  addData: () => {},
  deleteData: () => {},
  database: false,
  auth: false,
  provider: "",
});

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(undefined);
  const [backdrop, setBackdrop] = useState(false);
  let navigate = useNavigate();
  //   const token = localStorage.getItem("accessToken");

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      let curURL = window.location.pathname;
      if (authUser) {
        setUser(authUser);
        console.log("çalıştı");
        console.log(curURL);

        if (curURL === "/Login") {
          navigate("/home", { replace: true });
        }
      } else {
        console.log("çıkış çalıştı");

        setUser(null);
      }
    });
  }, []);

  console.log(user);

  const setBack = (x) => {
    setBackdrop(x);
  };
  const [userList, setUserList] = useState();

  const addData = (data) => {
    db.collection(user._delegate.uid).add(data);
  };

  const deleteData = (x) => {
    const item = userList.filter((movie) => movie.data.title === x.title);
    console.log(item);

    db.collection(user._delegate.uid).doc(item[0].id).delete();
  };

  useEffect(() => {
    user &&
      db.collection(user._delegate.uid).onSnapshot((snapshot) => {
        setUserList(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
  }, [user]);

  console.log(userList);

  const contextValue = {
    user: user,
    userList: userList,
    backdrop: backdrop,
    setBackdrop: setBack,
    addData: addData,
    deleteData: deleteData,
    database: db,
    auth: auth,
    provider: provider,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
