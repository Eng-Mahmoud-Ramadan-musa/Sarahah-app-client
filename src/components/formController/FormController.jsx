/* eslint-disable react/prop-types */
import { MdOutlineFavorite } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import api from '../../utils/axios';
import RemoveOrRestore from "../buttons/RemoveOrRestore";
import FriendOrBlock from "../buttons/FriendOrBlock";
import { deleteMessage, isFavorites } from "../../features/message";

export default function FormController({ msg, index }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  // const user = useSelector((state) => state.auth.currentUser);
  const showData = useSelector((state) => state.message.showData);

  const fetchMessages = async (endpoint) => {
    try {
      await api.patch(
        `${import.meta.env.VITE_BASE_URL}${endpoint}`,
        {},
        {
          headers: {
            authorization: `${import.meta.env.VITE_BEARER_KEY} ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (showData !== "favorite") {
        dispatch(isFavorites(index));
      } else {
        dispatch(deleteMessage(index));
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  return (
    <div className="flex justify-end items-center gap-2 text-xl w-32 h-8">
      {showData !== "archive" && (
        <>
          
            <FriendOrBlock msg={msg} index={index} />

<button
  onClick={() => {
    fetchMessages(`/message/${msg._id}`)
  }}
  className="hover:scale-110 duration-200 hover:bg-slate-400 p-1 rounded-lg"
>
  <MdOutlineFavorite
    className={`${
      msg.favorite ? "bg-white text-red-500 rounded-sm" : "text-gray-500"
    }`}
  />
</button>

        </>
      )}
      <RemoveOrRestore msg={msg} index={index} />
    </div>
  );
}
