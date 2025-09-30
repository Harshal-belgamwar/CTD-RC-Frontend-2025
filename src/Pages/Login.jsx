import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const backend_url=import.meta.env.VITE_API_URL;

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    event_id: 2,
    isjunior: false,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
     
      const response = await axios.post(
        `${backend_url}/user/login`,
        formData,
        { withCredentials: true }
      );

      

      if (response?.status === 200) {
        

        localStorage.setItem("currentUser", JSON.stringify(response.data.user));

        
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 1000,
        });

        navigate("/instructions");
      }
    } catch (err) {
     
      if (err.response?.status === 501) {
        toast.error(err.response.data.message, {
          position: "top-center",
          autoClose: 2000,
        });
        navigate("/results");
        return;
      }

      if (err.response?.status === 400) {
        toast.error(err.response.data.error, {
          position: "top-center",
          autoClose: 2000,
        });
        return;
      }

      toast.error(err.response?.data?.error, {
        position: "top-center",
        autoClose: 2000,
      });
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#191919] bg-cover bg-center tracking-wide">
      <p className="absolute top-8 left-8 text-[#CAFF33] font-bold text-6xl tracking-wide">
        RC
      </p>
      <div className="backdrop-blur-lg p-10 rounded-[20px] w-full max-w-md flex flex-col items-center justify-center min-h-[500px] h-80 bg-[#191919] bg-[radial-gradient(circle_at_0%_0%,rgba(83,172,58,0.4)_0%,transparent_30%),radial-gradient(circle_at_100%_100%,rgba(83,172,58,0.4)_0%,transparent_30%)]">
        <h1 className="text-[#CAFF33] font-bold text-4xl mb-13">Login</h1>

        <form className="space-y-8 w-full " onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-white text-sm font-medium mb-2 tracking-widest ml-1"
            >
              USERNAME
            </label>

            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
              placeholder="Enter username"
              className="w-full px-4 py-3 bg-transparent border-[2px] border-[#3D633F] text-white rounded-[50px] focus:outline-none focus:ring-2 focus:ring-[#3D633F] placeholder:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-white text-sm font-medium mb-2 tracking-widest ml-1"
            >
              PASSWORD
            </label>

            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              placeholder="Enter password"
              className="w-full px-4 py-3 bg-transparent border-[2px] border-[#3D633F] text-white rounded-[50px] focus:outline-none focus:ring-2 focus:ring-[#3D633F] placeholder:text-sm"
            />
          </div>

          <div className="flex items-center gap-6 mt-4">
            {/* Junior */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="level"
                value="junior"
                checked={formData.isjunior === true}
                onChange={() => setFormData({ ...formData, isjunior: true })}
                className="hidden peer"
              />
              <span
                className="w-5 h-5 rounded-full border-2 border-[#CAFF33] flex-shrink-0
                     peer-checked:bg-[#CAFF33] peer-checked:shadow-[0_0_5px_#CAFF33]
                     transition-all duration-300"
              ></span>
              <span className="text-gray-300 font-medium">Junior</span>
            </label>

            {/* Senior */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="level"
                value="senior"
                checked={formData.isjunior === false}
                onChange={() => setFormData({ ...formData, isjunior: false })}
                className="hidden peer"
              />
              <span
                className="w-5 h-5 rounded-full border-2 border-[#CAFF33] flex-shrink-0
                     peer-checked:bg-[#CAFF33] peer-checked:shadow-[0_0_5px_#CAFF33]
                     transition-all duration-300"
              ></span>
              <span className="text-gray-300 font-medium">Senior</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#1f1f1f]/70 border-[2px] border-[#CAFF33] text-[#CAFF33] font-extrabold mt-5 py-3 px-4 rounded-[50px] shadow-[0_0_10px_#CAFF33] transition-all duration-300
    ${
      loading
        ? "opacity-70 cursor-not-allowed"
        : "hover:bg-[#CAFF33] hover:text-[#191919] hover:shadow-[0_0_20px_#CAFF33]"
    }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-4 border-[#CAFF33] border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-2">Loading...</span>
              </div>
            ) : (
              "LOGIN"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
