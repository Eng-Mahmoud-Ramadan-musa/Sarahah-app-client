import FacebookLogin from "react-facebook-login-lite";
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../features/auth';
import axios from "axios";

const FacebookSignIn = () => {
  const dispatch = useDispatch();

  const handleSuccess = async (response) => {
    console.log("Facebook login success:", response);
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

  const handleFail = (error) => {
    console.error("Facebook login error:", error);
  };

  return (
    <div className="flex justify-center mt-4">
      <FacebookLogin
        appId="YOUR_FACEBOOK_APP_ID"
        onSuccess={handleSuccess}
        height="40px"
        onFail={handleFail}
        render={({ onClick }) => (
          <button onClick={onClick}>Login with Facebook</button>
        )}
      />
    </div>
  );
};

export default FacebookSignIn;


