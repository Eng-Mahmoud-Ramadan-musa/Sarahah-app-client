import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from '../utils/axios';
import { getMessages } from "../features/message.js";
import Header from "../components/header/Header.jsx";
import Filter from "../components/filter/Filter.jsx";
import RemoveAll from "../components/buttons/RemoveAll.jsx";
import Message from "../components/message/Message.jsx";
import NotFound from "./NotFound";
import Footer from "../components/footer/Footer.jsx";
import Users from "./Users.jsx";
import ShareLink from "../components/shareLink/ShareLink.jsx";
import { Helmet } from "react-helmet-async";

export default function Messages() {
  const {token} = useSelector((state) => state.auth);
  const showData = useSelector((state) => state.message.showData);
  const messagesData = useSelector((state) => state.message.messages);
  const filterData = useSelector((state) => state.message.filteredMessages);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get(`${import.meta.env.VITE_BASE_URL}/message`, {
          headers: {
            authorization: `${import.meta.env.VITE_BEARER_KEY} ${token}`,
          },
        });
        dispatch(getMessages({ data: res.data.data }));
      } catch (err) {
        console.error("Error fetching messages:", err.message);
      }
    };

    if (token) {
      fetchMessages();
    }
  }, [dispatch, token]);

  const renderMessages = () => {
    if (showData === "user") {
      return <Users />;
    } else if (showData === "search") {
      return filterData.length > 0 ? (
        filterData.map((message, index) => (
          <Message key={message._id || index} msg={message} />
        ))
      ) : (
        <NotFound content="No matching messages found" />
      );
    
    }else {
      return messagesData.length > 0 ? (
        messagesData.map((message, index) => (
          <Message key={message._id || index} msg={message} index={index} />
        ))
      ) : (
        <NotFound content="Messages" />
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>Messages | Sarahah</title>
        <meta name="description" content="Your messages page in Sarahah app. Receive anonymous messages from your friends." />
        <meta property="og:title" content="Messages | Sarahah" />
        <meta property="og:description" content="Your messages page in Sarahah app. Receive anonymous messages from your friends." />
      </Helmet>
      <div className="flex flex-col items-center justify-start w-full h-full pt-14">
        <Header />
        <ShareLink />
        <Filter />
        <div className="flex flex-col items-center justify-start border overflow-y-auto w-full sm:w-2/3 lg:w-1/2 mt-2 flex-1 px-4 sm:px-6 lg:px-8 pt-2">
          <RemoveAll />
          {renderMessages()}
        </div>
        <Footer />
      </div>
    </>
  );
}
