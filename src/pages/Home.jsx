import { Link } from "react-router-dom";
import Messages from './Messages';
import { useSelector } from "react-redux";
import GoogleSignIn from "../components/buttons/GoogleSignIn.jsx";
import { useEffect} from "react";
import { Helmet } from "react-helmet";
import FacebookLogin from "../components/buttons/FacebookSignIn.jsx";

export default function Home() {
  const user = useSelector((state) => state.auth.currentUser);
  useEffect(() => {
    const checkFbSdk = setInterval(() => {
      if (window.FB) {
        clearInterval(checkFbSdk);
      }
    }, 1000);

    // تنظيف الـ interval عند التدمير
    return () => clearInterval(checkFbSdk);
  }, []);

  return (
    <>
    <Helmet>
      <title>Sarahah Home</title>
      <meta name="description" content="Sarahah App - Send anonymous messages to your friends easily and privately." />
      <meta property="og:title" content="Sarahah | Home" />
      <meta property="og:description" content="Sarahah App - Send anonymous messages to your friends easily and privately." />
      <meta property="og:image" content="https://sarahah.com/logo.png" />
      <meta property="og:url" content="https://sarahah.com" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="Sarahah" />
      <meta property="og:image:width" content="1200" />
    </Helmet>

      <div className="flex flex-col justify-center gap-5 items-center w-full h-full">
        {
          !user 
          ? (
              <>
                <h1 className="text-5xl font-bold text-green-500 mb-20">Sarahah App</h1>
                <div className="flex justify-center items-center gap-5 text-white font-medium">
                  <Link to='/login'><button className="bg-green-500 px-3 rounded-lg hover:scale-110 duration-200 py-1">sign in</button></Link>
                  <Link to='/register'><button className="bg-red-500 px-3 rounded-lg hover:scale-110 duration-200 py-1">sign up</button></Link>
                </div>
                <p className="text-center text-white w-full">Sign up with</p>
                <div className="flex flex-col justify-center text-2xl gap-5 w-72">
                  <span className="hover:scale-105 duration-200">
                    <GoogleSignIn  />
                  </span>
                  <span className="hover:scale-105 duration-200">
                    <FacebookLogin  />
                  </span>
                </div>
              </>
          ) : (
            <Messages />
          ) 
          
        }

      </div>
    </>
  );
};
