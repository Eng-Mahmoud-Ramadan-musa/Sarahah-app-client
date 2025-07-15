import { useSelector } from "react-redux";
import NotFound from "./NotFound";
import { getFirstTwoInitials } from "../utils/helpers";
import UpdateFriend from "../components/buttons/UpdateFriend";
import { Link } from "react-router-dom";
import { GrSend } from "react-icons/gr";
import { Helmet } from "react-helmet-async";

export default function Users() {
  const users = useSelector((state) => state.auth.users);
  const filteredUsers = useSelector((state) => state.auth.filteredUsers);
  const showData = useSelector((state) => state.message.showData);

  const renderUserCard = (user, index) => (
    <div className="flex w-full h-16 justify-between items-center border rounded-lg border-white text-white px-[5%] gap-2">
      {/* User image or first initials */}
      <div className="w-12 h-12">
        {user.image ? (
          <img
            src={user.image.secure_url}
            alt="user"
            className="h-full w-full border-2 rounded-full object-cover"
          />
        ) : (
          <h2 className="bg-white text-black text-2xl p-1 sm:text-lg w-full h-full flex justify-center items-center font-bold rounded-full">
            {getFirstTwoInitials(user.userName)}
          </h2>
        )}
      </div>

      {/* User data */}
      <div className="w-2/3 bg-gray-700 text-nowrap text-ellipsis overflow-hidden px-3 rounded-lg">
        <h2>{user.userName}</h2>
        <h3 className="text-gray-400 text-nowrap text-ellipsis overflow-hidden">
          {user.email}
        </h3>
      </div>

      {/* Send message button and friendship button */}
      <div className="flex items-center gap-1 justify-between w-16">
        <Link
          to={`/send-message?${new URLSearchParams({ userName: user.userName, email: user.email }).toString()}`}
          className="hover:scale-110 duration-200 hover:bg-slate-400 bg-slate-600 text-2xl p-1 rounded-lg"
          title="Send Anonymous Message"
        >
          <GrSend />
        </Link>

        <UpdateFriend user={user} index={index} />
      </div>
    </div>
  );

  // Determine which users to display: filtered or full list
  const usersToShow =
    showData === "user" && filteredUsers.length > 0 ? filteredUsers : users;

  return (
    <>
      <Helmet>
        <title>Users Home</title>
        <meta
          name="description"
          content="Browse all Sarahah app users and send them anonymous messages."
        />
        <meta property="og:title" content="Users | Sarahah" />
        <meta
          property="og:description"
          content="Browse all Sarahah app users and send them anonymous messages."
        />
      </Helmet>

      <div className="flex flex-col items-center justify-start overflow-y-auto w-full mt-2 flex-1 px-4 sm:px-6 lg:px-8 pt-2 gap-2">
        {usersToShow.length > 0 ? (
          usersToShow.map((user, index) => (
            <div key={user._id || index} className="w-full">
              {renderUserCard(user, index)}
            </div>
          ))
        ) : (
          <NotFound content="users" />
        )}
      </div>
    </>
  );
}
