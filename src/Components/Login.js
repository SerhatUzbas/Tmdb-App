import { useContext } from "react";
import AuthContext from "../Store/Context";

const LoginPage = () => {
  const authCtx = useContext(AuthContext);
  const login = () => {
    authCtx.auth.signInWithPopup(authCtx.provider).catch((e) => console.log(e));
  };
  return (
    <div className='login-cont'>
     <div className="holdler"><h1 className='login-title'>See what's next.</h1>
      <h4 className='login-text'>Find a movie from anywhere.</h4>
      <div className='login-button' onClick={login}>
        <span className='feyk'>LOGIN WITH GOOGLE ACCOUNT</span>
      </div></div> 
    </div>
  );
};

export default LoginPage;
