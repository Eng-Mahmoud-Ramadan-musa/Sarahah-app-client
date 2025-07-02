import { MdAddAPhoto } from "react-icons/md";
import { RiDeleteBin6Line ,RiArchiveFill  } from "react-icons/ri";
import { BsPencilSquare } from "react-icons/bs";
import {  useDispatch, useSelector } from "react-redux";
import { updated,logout, save } from "../features/auth.js";
import { useEffect, useRef, useState } from "react";
import api from '../utils/axios';
// import { getFirstTwoInitials } from "../utils/helpers.js";
import BackButton from "../components/buttons/Back.jsx";
import { Helmet } from "react-helmet";

export default function Profile() {
  
  const token  = useSelector((state) => state.auth.token)
  const user  = useSelector((state) => state.auth.currentUser)
  const updateUser  = useSelector((state) => state.auth.updateUser);
  const dispatch= useDispatch();
    const [username, setUsername] = useState(user.userName);
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState(user.phone);
    const [dob, setDob] = useState(user.dob);
    const [gender, setGender] = useState(user.gender);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(user.image.secure_url);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const fileInputRef = useRef();
    useEffect(() => {
      if (image) {
        const objectUrl = URL.createObjectURL(image);
        setImagePreview(objectUrl); // Set preview image
  
        return () => URL.revokeObjectURL(objectUrl); // Clean up memory after using the image
      }
    }, [image]);
    

    const afterAccountAction = () => {
      dispatch(logout());
      window.location.href = '/';
    };
    
    const handleError = (msg) => {
      console.error(msg);
      alert(msg);
    };
    
    const handleDelete = async () => {
      const confirm = window.confirm("Are you sure you want to permanently delete your account? This action cannot be undone.");
      if (!confirm) return;
    
      try {
        await api.delete('/user', {
          headers: {
            authorization: `${import.meta.env.VITE_BEARER_KEY} ${token}`,
          },
        });
        afterAccountAction();
      } catch (error) {
        handleError(error.response?.data?.message || "An error occurred while deleting the account. Please try again.");
      }
    };
    
    const archive = async () => {
      const confirm = window.confirm("Are you sure you want to archive (freeze) your account? You can reactivate it later.");
      if (!confirm) return;
    
      try {
        await api.delete('/user/freeze', {
          headers: {
            authorization: `${import.meta.env.VITE_BEARER_KEY} ${token}`,
          },
        });
        afterAccountAction();
      } catch (error) {
        handleError(error.response?.data?.message || "An error occurred while archiving the account. Please try again.");
      }
    };
    
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('userName', username);
    password && formData.append('password', password);
    phone && formData.append('phone', phone);
    dob && formData.append('dob', dob);
    gender && formData.append('gender', gender);
    if (image instanceof File) {
      formData.append('image', image);
    }
    
    
  
    try {
      const res = await api.put('/user', 
        formData, {
        headers: {
          authorization: `${import.meta.env.VITE_BEARER_KEY} ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      
      
      dispatch(save({ user: res.data.data }));
      dispatch(updated());
      setSuccess(res.data.message); // Show success message
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };
  
    return (
      <>
        <Helmet>
          <title>Profile | Sarahah</title>
          <meta name="description" content="Your profile page in Sarahah app. Edit your data or profile picture easily." />
          <meta property="og:title" content="Profile | Sarahah" />
          <meta property="og:description" content="Your profile page in Sarahah app. Edit your data or profile picture easily." />
        </Helmet>
        <div className="relative h-screen w-full flex items-center justify-center px-[10%]">
          <BackButton url='/messages' />
          <div className="absolute top-[25%] right-[5%] bg-slate-300 p-2 rounded-lg text-white font-bold flex flex-col justify-start items-start gap-2 group">
             <button onClick={() => dispatch(updated())}  className="opacity-80 hover:opacity-100 bg-green-600 p-2 rounded-lg transition-opacity duration-300"><BsPencilSquare /></button>
             <button onClick={archive} className="opacity-80 hover:opacity-100 bg-red-400 p-2 rounded-lg transition-opacity duration-300"><RiArchiveFill /></button>
             <button onClick={handleDelete} className="opacity-80 hover:opacity-100 bg-red-600 p-2 rounded-lg transition-opacity duration-300"><RiDeleteBin6Line /></button>
          </div>
    {/* {loading ? ( */}
    <form onSubmit={handleSubmit} className="w-full sm:w-2/3 border p-3 flex flex-col items-start gap-3">
    <div className="w-full flex justify-center items-center h-16 overflow-hidden relative ">
    {imagePreview ? (
      <div className="relative">
        <img 
          src={imagePreview || user.image} 
          alt={user.userName ? `User image ${user.userName}` : "User image"} 
          className="w-16 h-16 object-cover rounded-full border-2 border-gray-100" 
        />
        { updateUser &&<div className="absolute bottom-0 right-0 flex gap-1">
          <div 
            className="bg-red-500 p-1 rounded-full cursor-pointer hover:bg-red-600 transition-colors z-40"
            onClick={() => {
              setImage(null);
              setImagePreview(null); // Remove image
            }}
          >
            <RiDeleteBin6Line className="text-white text-sm" />
          </div>
          <div 
            className="bg-green-500 p-1 rounded-full cursor-pointer hover:bg-green-600 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <BsPencilSquare className="text-white text-sm" />
          </div>
        </div>}
      </div>
    ) : (
      <div 
        className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
        onClick={() => fileInputRef.current?.click()}
      >
        <MdAddAPhoto className="text-gray-500 text-xl" />
      </div>
    )}
  <input
    ref={fileInputRef}
    className="absolute opacity-0 cursor-pointer top-0 left-0 w-16 h-16 rounded-full"
    type="file"
    accept="image/*"
    onChange={(e) => setImage(e.target.files[0])}
  />

  </div>

      <label className="text-lg font-bold text-gray-400">
        UserName:
        {!updateUser ? (
          <span className="text-white ps-1"> {user.userName}</span>
        ) : (
          <input
            className="w-full border-b-2 outline-none ps-3"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
      </label>

      <label className="text-lg font-bold text-gray-400">
        Email: <span className="text-white ps-1">{user.email}</span>
      </label>

      <label className="text-lg font-bold text-gray-400">
        Password:
        {!updateUser ? (
          <span className="text-white ps-1"> ******</span>
        ) : (
          <input
            className="w-full border-b-2 outline-none ps-3"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}
      </label>

      <label className="text-lg font-bold text-gray-400">
        Phone:
        {!updateUser ? (
          <span className="text-white ps-1"> {user.phone}</span>
        ) : (
          <input
            className="w-full border-b-2 outline-none ps-3"
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        )}
      </label>

      <label className="text-lg font-bold text-gray-400">
        DOB:
        {!updateUser ? (
          <span className="text-white ps-1">{user.dob ? new Date(user.dob).toLocaleDateString() : ""}</span>
        ) : (
          <input
            className="w-full border-b-2 outline-none ps-3"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        )}
      </label>

      {!updateUser ? (
        <label className="text-lg font-bold text-gray-400">
          Gender: <span className="text-white ps-1">{user.gender}</span>
        </label>
      ) : (
        <>
          <div className="text-white flex w-full border justify-center py-2 items-center gap-5">
            <label className="font-bold">Genders:</label>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                id="male"
                value="male"
                checked={gender === 'male'}
                onChange={() => setGender('male')}
              />
              <label htmlFor="male">Male</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                id="female"
                value="female"
                checked={gender === 'female'}
                onChange={() => setGender('female')}
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
        </>
      )}

      <label className="text-lg font-bold text-gray-400">
        CreatedAt: <span className="text-white ps-1">{new Date(user.createdAt).toLocaleDateString()}</span>
      </label>

      <label className="text-lg font-bold text-gray-400">
        UpdatedAt: <span className="text-white ps-1">{new Date(user.updatedAt).toLocaleDateString()}</span>
      </label>

      <div className="w-full flex justify-center items-center">
      {updateUser && (
    <button className="mb-3 px-3 rounded-lg bg-green-500 text-white font-bold text-lg w-fit">
      save
    </button>
  )}

      </div>

      {error && <p className="text-red-600 text-sm font-bold">{error}</p>}

      {success && <p className="text-green-600 text-sm font-bold">{success}</p>}
    </form>

        </div>
      </>
    );
}
