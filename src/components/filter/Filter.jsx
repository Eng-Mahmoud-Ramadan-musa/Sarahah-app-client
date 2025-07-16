import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";
import { MdSend, MdOutlineMarkEmailRead, MdOutlineMail, MdOutlineFavorite, MdAutoDelete } from "react-icons/md";
import { GiThreeFriends } from "react-icons/gi";
import { TbFriendsOff } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, sortMessages } from "../../features/message.js";
import { getUsers, sortUsers } from "../../features/auth.js";
import api from '../../utils/axios';
import { useState } from "react";

export default function Filter() {
  const [activeFilter, setActiveFilter] = useState("all");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const fetchMessages = async (filter, endpoint, store, optional = "all") => {
    try {
      setActiveFilter(filter);
      const response = await api.get(`${import.meta.env.VITE_BASE_URL}${endpoint}`, {
        headers: {
          "Authorization": `${import.meta.env.VITE_BEARER_KEY} ${token}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(store({ data: response.data.data, mangeState: optional, favorite: response.data.favorite }));

    } catch (error) {
      console.error("Error fetching messages:", error.message);
    }
  };

  const handleSort = (sortOrder) => {
    setActiveFilter(sortOrder);
    dispatch(sortMessages({ sort: sortOrder }));
    dispatch(sortUsers({ sort: sortOrder }));
  };

  const filters = [
    { id: "all", icon: <MdOutlineMail />, action: () => fetchMessages("all", "/message", getMessages, "all") },
    { id: "sender", icon: <MdSend />, action: () => fetchMessages("sender", "/message/all-sender", getMessages, "all") },
    { id: "receiver", icon: <MdOutlineMarkEmailRead />, action: () => fetchMessages("receiver", "/message/all-receiver", getMessages, "all") },
    { id: "asc", icon: <FaSortAmountUp />, action: () => handleSort("asc") },
    { id: "desc", icon: <FaSortAmountDown />, action: () => handleSort("desc") },
    { id: "favorite", icon: <MdOutlineFavorite className="text-red-500" />, action: () => fetchMessages("favorite", "/message/all-favorite", getMessages, "favorite") },
    { id: "archive", icon: <MdAutoDelete />, action: () => fetchMessages("archive", "/message/all-archive", getMessages, "archive") },
    { id: "friend", icon: <GiThreeFriends />, action: () => fetchMessages("friend", "/user/friends", getUsers, "user") },
    { id: "block", icon: <TbFriendsOff />, action: () => fetchMessages("block", "/user/blockUser", getUsers, "user") },
  ];

  return (
    <div className="w-full flex items-center justify-center gap-3 px-[5%] bg-slate-500">
      <h3 className="text-lg font-bold text-white">Filter:</h3>
      <form className="text-white w-full h-full flex items-center justify-center gap-3 text-lg">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={filter.action}
            className={`${activeFilter === filter.id ? "h-full bg-green-400 px-1 rounded-t-full" : ""}`}
          >
            {filter.icon}
          </button>
        ))}
      </form>
    </div>
  );
}
