/* eslint-disable react/prop-types */
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, friendOrBlock } from "../../features/auth";  // استيراد الإجراء لتحديث بيانات المستخدم بعد التغيير
import { TbFriends, TbFriendsOff } from "react-icons/tb";

export default function UpdateFriend({user , index}) {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const userExist = useSelector((state) => state.auth.currentUser);
    const isBlocked = userExist.blockUser.includes(user.email);
    const isFriends = userExist.friends.includes(user.email);
    
    const fetchUsers = async (endpoint) => {
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
        fetchUsers(`/user/add-friend/${user.email}`);
        dispatch(deleteUser(index));
        dispatch(friendOrBlock({FB: true,email: user.email})); 
    
      };
    
      const toggleBlock = () => {
        fetchUsers(`/user/add-block/${user.email}`);
        dispatch(deleteUser(index));
        dispatch(friendOrBlock({FB: false,email: user.email})); 
      };
    
      return (
        
            <div className="text-3xl">
              {/* زر الصداقة */}
              {isFriends && <button
                onClick={toggleFriend}
                className="hover:scale-110 duration-200 hover:bg-slate-400 p-1 rounded-lg"
              >
                <TbFriends
                  className={`${
                    isFriends ? "bg-green-400 text-white rounded-lg p-1" : "text-gray-500"
                  }`}
                />
              </button>}
    
              {/* زر الحظر */}
              {isBlocked &&<button
                onClick={toggleBlock}
                className="hover:scale-110 duration-200 hover:bg-slate-400 p-1 rounded-lg"
              >
                <TbFriendsOff
                  className={`${
                    isBlocked ? "bg-red-400 text-white rounded-lg p-1" : "text-gray-500"
                  }`}
                />
              </button>}
            </div>
      )
}
