import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { FaUserSecret } from "react-icons/fa";
import { useSelector } from "react-redux";
import api from '../../utils/axios';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FormSendMessage() {
  const {token} = useSelector((state) => state.auth);
  const [content, setContent] = useState("");
  const [hiddenMsg, setHiddenMsg] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const receiverData = {
    userName: queryParams.get("userName"),
    email: queryParams.get("email"),
  };

  const navigate = useNavigate();
  
  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
      localStorage.setItem('redirectAfterLogin', location.pathname + location.search);
    }
  }, [token, navigate, location.pathname, location.search]);
  


  const createMessage = async (event) => {
    event.preventDefault();
    try {
      await api.post(`${import.meta.env.VITE_BASE_URL}/message/send`, {
        content: content,
        email: receiverData.email,
        hidden: hiddenMsg,
      }, {
        headers: {
          authorization: `${import.meta.env.VITE_BEARER_KEY} ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setContent("");
      setHiddenMsg(false);
      setError(""); // Reset error on success

    } catch (err) {
      setError(err.response?.data?.message || "حدث خطأ أثناء إرسال الطلب.");
    }
  };

  return (
    <div className=" relative w-full h-full flex justify-center items-center px-4 sm:px-6">
              <form
              onSubmit={createMessage}
              className="flex flex-col justify-between items-center w-96 border-2 border-gray-300 rounded-xl bg-gray-300 overflow-hidden"
            >
              <label className="bg-slate-600 w-full text-center font-bold pt-1">send to:  <span className="text-white ms-1">{receiverData?.userName}</span></label>
              <textarea
                rows={3}
                cols={50}
                name="content"
                className="w-full py-1 text-black font-semibold ps-4 border-2 border-gray-300 outline-none rounded-xl"
                placeholder="send message"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
              <div className="flex py-2 justify-center items-center">
                <button
                  onClick={() => setHiddenMsg(!hiddenMsg)}
                  type="button" 
                  className={`hover:scale-110 hover:animate-pulse ms-3 flex justify-center items-center p-1 rounded-lg transition duration-200 hover:bg-slate-400 ${hiddenMsg ? "bg-white" : ""} `}
                >
                  <FaUserSecret className={`text-xl text-gray-500 ${hiddenMsg ? "text-red-600" : ""}`} />
                </button>
      
                <button
                  type="submit"
                  className={`hover:scale-110 hover:animate-pulse ms-3 flex justify-center items-center p-1 rounded-lg transition duration-200 hover:bg-slate-400`}
                >
                  <IoMdSend className="text-xl text-black" />
                </button>
              </div>
              {error && <p className="text-center text-red-500 mb-4">{error}</p>}
            </form>
    </div>
  );
}