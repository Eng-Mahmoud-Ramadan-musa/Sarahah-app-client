/* eslint-disable react/prop-types */
import { MdOutlineFavorite } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import api from '../../utils/axios';
import RemoveOrRestore from "../buttons/RemoveOrRestore";
import FriendOrBlock from "../buttons/FriendOrBlock";
import { isFavorites } from "../../features/message";
import { useState, useEffect } from "react";

export default function FormController({ msg, index }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { showData, listFavorite } = useSelector((state) => state.message);

  const [isFavorite, setIsFavorite] = useState(null); 

useEffect(() => {
  if (Array.isArray(listFavorite)) {
    const exists = listFavorite.includes(msg._id);
    if (isFavorite === null || isFavorite !== exists) {
      setIsFavorite(exists);
    }
  }
}, [listFavorite, msg._id]);

  const fetchMessages = async (endpoint) => {
    const optimistic = !isFavorite;
    setIsFavorite(optimistic); // ✅ تحديث الزر فورًا
    dispatch(isFavorites( index ));

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
    } catch (error) {
      console.error("Error updating favorite status:", error);
      // ❌ تراجع إذا فشلت العملية
      setIsFavorite(!optimistic);
      dispatch(isFavorites({ index }));
    }
  };

  return (
    <div className="flex justify-end items-center gap-2 text-xl w-32 h-8">
      {showData !== "archive" && (
        <>
          <FriendOrBlock msg={msg} index={index} />
{isFavorite !== null && (
  <button
    onClick={() => fetchMessages(`/message/${msg._id}`)}
    className="hover:scale-110 duration-200 p-1 rounded-lg"
  >
    <MdOutlineFavorite
      className={`text-2xl transition-colors duration-300 ${
        isFavorite ? "text-red-500" : "text-gray-500"
      }`}
    />
  </button>
)}

        </>
      )}
      <RemoveOrRestore msg={msg} index={index} />
    </div>
  );
}
