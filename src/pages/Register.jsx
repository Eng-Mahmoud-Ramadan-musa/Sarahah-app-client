import { Link } from "react-router-dom";
import api from '../utils/axios';
import { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import Loading from "../components/loading/Loading";
import BackButton from "../components/buttons/Back";
import { Helmet } from "react-helmet";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('male');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setImagePreview(objectUrl); // Set preview image

      return () => URL.revokeObjectURL(objectUrl); // Clean up memory after using the image
    }
  }, [image]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('userName', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    formData.append('phone', phone);
    formData.append('dob', dob);
    formData.append('gender', gender);
    if (image) {
        formData.append('image', image); // Add image if it exists
    }

    try {
      const response = await api.post('/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      alert('Registration successful!');
      if (response.status === 201) {
        window.location.href = '/login';
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred!';
      alert('Error: ' + errorMessage);
    } finally {
      setLoading(false);
    }
    
};


  return (
    <>
      <Helmet>
        <title>Register New Account | Sarahah</title>
        <meta name="description" content="Create your account in Sarahah app and start receiving anonymous messages from your friends." />
        <meta property="og:title" content="Register New Account | Sarahah" />
        <meta property="og:description" content="Create your account in Sarahah app and start receiving anonymous messages from your friends." />
      </Helmet>
      <div className="w-full px-[5%] h-full flex flex-col justify-center items-center gap-5">
        <BackButton url='/' />
        <h2 className="text-2xl font-bold text-green-500">Register</h2>
        <form className="w-full max-w-80 border p-5 rounded-lg flex flex-col items-center gap-3" onSubmit={handleSubmit}>
          <input 
            className="w-full border-b-2 outline-none ps-3" 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required
          />
          <input 
            className="w-full border-b-2 outline-none ps-3" 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            className="w-full border-b-2 outline-none ps-3" 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
          <input 
            className="w-full border-b-2 outline-none ps-3" 
            type="password" 
            placeholder="confirmPassword" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required
          />
          <input 
            className="w-full border-b-2 outline-none ps-3" 
            type="tel" 
            placeholder="Phone" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            required
          />
          <input 
            className="w-full border-b-2 outline-none ps-3" 
            type="date" 
            value={dob} 
            onChange={(e) => setDob(e.target.value)} 
            required
          />
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

          <div className="flex justify-between items-center h-16 overflow-hidden">
          <input 
              className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100
            "
              type="file" 
              accept="image/*" // Accept only image files
              onChange={(e) => setImage(e.target.files[0])} 
            />
            {imagePreview && (
            <div className=" relative flex items-center gap-3">
              <img src={imagePreview} alt="Image Preview" className="h-16 w-16 object-cover rounded-full" />
              <button 
                type="button" 
                className=" p-1 bg-red-500 text-white rounded-full absolute bottom-0 right-0" 
                onClick={() => {
                  setImage(null);
                  setImagePreview(null);
                }}
              >
                <MdDelete className=" " />
              </button>
            </div>
          )}

          </div>
   
{
  <button 
  type="submit" 
  className="mb-3 px-3 h-8 w-20 rounded-lg bg-green-500 text-white font-bold text-lg"
  disabled={loading}
>
  {loading ? <Loading /> : 'Create'}
</button>

}
          <p className="w-full flex justify-between text-gray-400">
            Already have an account? <Link className="text-black font-bold bg-gray-300 hover:text-white duration-200 border px-2 py-1 rounded-lg border-white hover:bg-red-500" to="/login">Login</Link>
          </p>
        </form>
      </div>
    </>
  )
}
