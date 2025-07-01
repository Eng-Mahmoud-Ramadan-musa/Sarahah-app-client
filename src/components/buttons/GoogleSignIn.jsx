import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/auth";
import ErrorMessage from "../error/ErrorMessage";

export default function GoogleSignIn() {
  const dispatch = useDispatch();
  const handleSuccess = async (response) => {
    const idToken = response.credential;
    
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/google-login`,
        {
          method: "POST", 
             headers: {
          "Content-Type": "application/json"
          },
          body: JSON.stringify({idToken})
        }
      )
      const responseData = await res.json();
      const data = responseData.data;
      

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
      const redirectAfterLogin = localStorage.getItem("redirectAfterLogin");
      if (redirectAfterLogin) {
        localStorage.removeItem("redirectAfterLogin"); // مهم عشان متكررش التوجيه
        window.location.href = redirectAfterLogin;
      } else {
        window.location.href = '/messages';
      }
    } catch (error) {
      console.error("Error sending data to backend:", error.response?.data || error.message);
      alert("حدث خطأ أثناء تسجيل الدخول.");
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID} >
      <GoogleLogin 
        onSuccess={handleSuccess}
        onError={() => <ErrorMessage err={"Login Failed"} />}
      />
    </GoogleOAuthProvider>
  );
}
