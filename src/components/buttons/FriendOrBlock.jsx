/* eslint-disable react/prop-types */
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { friendOrBlock } from "../../features/auth";  // استيراد الإجراء لتحديث بيانات المستخدم بعد التغيير
import { TbFriends, TbFriendsOff } from "react-icons/tb";

export default function FriendOrBlock({ msg }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.currentUser);
  const isBlocked = user.blockUser.includes(msg.sender.email);
  const isFriends = user.friends.includes(msg.sender.email);
  const fetchMessages = async (endpoint) => {
    try {
       await axios.patch(`${import.meta.env.VITE_BASE_URL}${endpoint}`, {}, {
        headers: {
          authorization: `${import.meta.env.VITE_BEARER_KEY} ${token}`,
          "Content-Type": "application/json",
        },
      });

    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleFriend = () => {
    fetchMessages(`/user/add-friend/${msg.sender.email}`);
    dispatch(friendOrBlock({FB: true,email: msg.sender.email})); 

  };

  const toggleBlock = () => {
    fetchMessages(`/user/add-block/${msg.sender.email}`);
    dispatch(friendOrBlock({FB: false,email: msg.sender.email})); 


  };

  return (
    <>
      {user._id !== msg.sender._id && msg.hidden !== true && (
        <>
          {/* زر الصداقة */}
          <button
            onClick={toggleFriend}
            className="hover:scale-110 duration-200 hover:bg-slate-400 p-1 rounded-lg"
          >
            <TbFriends
              className={`${
                isFriends ? "bg-green-400 text-white rounded-sm" : "text-gray-500"
              }`}
            />
          </button>

          {/* زر الحظر */}
          <button
            onClick={toggleBlock}
            className="hover:scale-110 duration-200 hover:bg-slate-400 p-1 rounded-lg"
          >
            <TbFriendsOff
              className={`${
                isBlocked ? "bg-red-400 text-white rounded-sm" : "text-gray-500"
              }`}
            />
          </button>
        </>
      )}
    </>
  );
}
