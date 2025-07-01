import { FacebookLoginButton } from "reactjs-social-login";
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../features/auth';
import axios from "axios";

const FacebookLogin = () => {
  const dispatch = useDispatch();

  const handleLoginSuccess = async (response) => {
    if (response.accessToken) {
      try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/facebook`, {
          accessToken: response.accessToken,
        });
             const data = res.data;
             
       
             if (!data.access_token) {
               throw new Error("Login failed");
             }
       
             dispatch(
               loginSuccess({
                 user: data.user,
                 access_token: data.access_token,
                 refresh_token: data.refresh_token,
               })
             );
             window.location.href = '/messages';
      } catch (error) {
        console.error("خطأ أثناء المصادقة:", error.response?.data || error.message);
        alert("حدث خطأ أثناء تسجيل الدخول.");
        
      }
    }
  };

  const handleLoginFailure = (error) => {
    console.error("Facebook login error:", error);
  };

  return (
    <div className="flex justify-center mt-4">
      <FacebookLoginButton
        appId="YOUR_FACEBOOK_APP_ID"
        onLoginSuccess={handleLoginSuccess}
        onLoginFailure={handleLoginFailure}
      >
        Login with Facebook
      </FacebookLoginButton>
    </div>
  );
};

export default FacebookLogin;


