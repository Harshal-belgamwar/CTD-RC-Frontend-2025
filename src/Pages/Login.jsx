import api from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import rc_image from "/RC_Logo (3).png";
import bg_image from "/background.svg";
import login_image from "/LOGIN.svg";


const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    teamname: "",
    event_id: 2,
    isjunior: false,
    isVerified: false,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(formData, formData.username);

      const username = (formData.username || "").trim();
      const password = (formData.password || "").trim();
      const teamname = (formData.teamname || "").trim();

      console.log(formData, username);
      const response = await api.post(
        `/user/login`,
        {
          username: username,
          password: password,
          teamname: teamname,
          event_id: formData.event_id,
          isjunior: formData.isjunior,
          isVerified: formData.isVerified,
        }
      );

      if (response?.status === 200) {
        localStorage.setItem("currentUser", JSON.stringify(response.data.user));
        localStorage.setItem("isVerified", response.data.isVerified);
        localStorage.setItem("token", response.data.token);

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
        localStorage.setItem("isVerified", err.response.data.isVerified);
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
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <img
        src={bg_image}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover "
      />

      {/* BLUR OVERLAY */}
      <div className="absolute inset-0 backdrop-blur-md bg-[#0E0D40]/40"></div>

      {/* RC LOGO */}
      <div className="absolute top-6 left-6 z-20">
        <img src={rc_image} className="h-[50px]" alt="RC Logo" />
      </div>

      {/* FORM CONTAINER */}
      <div className="relative z-20 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-10 rounded-2xl  bg-transparent flex flex-col gap-20 ">
          <div className="flex justify-center items-center">
            <h1
              className="
            font-stranger
            bg-gradient-to-b from-[#FFE7A3] via-[#E6B65C] to-[#B8832F]
            bg-clip-text text-transparent
            [-webkit-text-stroke:1px_#1B1F4A]
            drop-shadow-[4px_4px_0_#0D1026]
            [text-shadow:0_0_30px_rgba(230,182,92,0.5)]
            text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl
            
            px-4
          "
            >
              LOGIN
            </h1>
          </div>


          <form className="space-y-7 w-full" onSubmit={handleSubmit}>
            {/* USERNAME */}
            <div>
              <label className="w-full sm:w-[90%] md:w-[80%] text-base sm:text-lg tracking-wide text-[#FFE7A3] font-play">
                USERNAME
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
                placeholder="Enter username"
                className="w-full px-4 py-3 bg-[#0E0D40] border-2 border-[#CA915F] text-[#FFEAD7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#CA915F] placeholder:text-[#FFEAD7]/60"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="w-full sm:w-[90%] md:w-[80%] text-base sm:text-lg tracking-wide text-[#FFE7A3] font-play">
                PASSWORD
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                placeholder="Enter password"
                className="w-full px-4 py-3 bg-[#0E0D40] border-2 border-[#CA915F] text-[#FFEAD7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#CA915F] placeholder:text-[#FFEAD7]/60"
              />
            </div>

            {/* Team name */}
            <div>
              <label className="w-full sm:w-[90%] md:w-[80%] text-base sm:text-lg tracking-wide text-[#FFE7A3] font-play">
                Team Name
              </label>
              <input
                type="text"
                value={formData.teamname}
                onChange={(e) =>
                  setFormData({ ...formData, teamname: e.target.value })
                }
                required
                placeholder="Enter team name"
                className="w-full px-4 py-3 bg-[#0E0D40] border-2 border-[#CA915F] text-[#FFEAD7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#CA915F] placeholder:text-[#FFEAD7]/60"
              />
            </div>

            {/* LEVEL RADIO */}
            <div className="flex gap-10 justify-center text-[#FFEAD7]">
              <label className="flex items-center gap-2 cursor-pointer font-play">
                <input
                  type="radio"
                  checked={formData.isjunior === true}
                  onChange={() =>
                    setFormData({ ...formData, isjunior: true })
                  }
                  className="hidden peer"
                />
                <span className="w-5 h-5 rounded-full border-2 border-[#CA915F] peer-checked:bg-[#CA915F] transition"></span>
                Junior
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-play">
                <input
                  type="radio"
                  checked={formData.isjunior === false}
                  onChange={() =>
                    setFormData({ ...formData, isjunior: false })
                  }
                  className="hidden peer"
                />
                <span className="w-5 h-5 rounded-full border-2 border-[#CA915F] peer-checked:bg-[#CA915F] transition"></span>
                Senior
              </label>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-5 py-3 rounded-md font-bold border-2 border-[#CA915F] text-[#1B1A2F] bg-[#CA915F] transition-all hover:bg-[#FFEAD7] hover:text-[#0E0D40] ${loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2 ">
                  <div className="w-5 h-5 border-4 border-[#CA915F] border-t-transparent rounded-md animate-spin"></div>
                  Loading...
                </div>
              ) : (
                <div className="font-play text-xl">
                  LOGIN
                </div>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
