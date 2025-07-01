import axios from 'axios';
import FacebookLogin from 'react-facebook-login';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../features/auth';

export default function FacebookSignIn() {
  const dispatch = useDispatch();

  const handleResponse = async (response) => {
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
  return (
    <div className="flex justify-center mt-4">
      <FacebookLogin
        appId="1130573835435542"
        autoLoad={false}
        fields="name,email,picture"
        callback={handleResponse}
        cssClass="bg-blue-600 text-white py-1 px-4 rounded-lg hover:bg-blue-700 transition w-full"
        icon="fa-facebook"
        textButton=" Login With Facebook"
      />
    </div>
  );
}


