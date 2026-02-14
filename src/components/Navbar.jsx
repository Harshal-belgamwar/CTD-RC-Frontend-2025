import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import rc_image from "../../public/RC_Logo (3).png"

const backend_url = import.meta.env.VITE_API_URL;

const Navbar = () => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (!key.startsWith("solved_")) {
        localStorage.removeItem(key);
      }
    }
    await axios.post(
      `${backend_url}/user/logout`,
      {},
      {
        withCredentials: true,
      }
    );

    navigate("/");
  };




  return (
    <div className="w-[90%] h-[13vh] max-w-7xl mx-auto flex justify-between items-center px-10 py-4 mt-8 rounded-2xl bg-transparent tracking-wide">
      {/* Logo */}
      <div className="flex items-center">
        <img className="h-[55px]" src={rc_image} alt="RC Logo" />
      </div>

      {/* Nav Links */}
      <div className="flex justify-evenly gap-10 items-center">
        {["/instructions", "/questionhub", "/leaderboard"].map((path, idx) => {
          const labels = ["INSTRUCTIONS", "QUESTION HUB", "LEADERBOARDS"];
          return (
            <NavLink
              key={idx}
              to={path}
              className={({ isActive }) =>
                `text-lg font-play font-bold tracking-widest transition-all duration-300
            ${isActive
                  ? "text-[#FFEAD7] border-b-2 border-[#CA915F] pb-1 shadow-md"
                  : "text-[#FFEAD7]/70 hover:text-[#FFEAD7] hover:shadow-sm hover:scale-105"
                }`
              }
            >
              {labels[idx]}
            </NavLink>
          );
        })}
      </div>

      {/* Logout Button */}
      <button
        className="
    relative
    group
    bg-gradient-to-br from-[#CA915F] via-[#E3B07E] to-[#B87440]
    text-[#FFFED7] font-bold 
    px-6 sm:px-8 lg:px-10
    py-2.5 sm:py-3 lg:py-4
    text-xs sm:text-sm lg:text-base
    rounded-lg sm:rounded-xl
    border-2 border-[#0E0D40]
    shadow-[0_4px_0_#0E0D40,0_8px_16px_rgba(0,0,0,0.3)]
    hover:shadow-[0_2px_0_#0E0D40,0_12px_24px_rgba(202,145,95,0.4)]
    hover:-translate-y-1
    active:translate-y-1
    active:shadow-[0_0_0_#0E0D40,0_4px_8px_rgba(0,0,0,0.2)]
    transform
    transition-all duration-300
    overflow-hidden
    tracking-wider
    flex items-center justify-center gap-2
  "
        style={{ textShadow: "2px 2px 4px rgba(74,18,55,0.5)" }}
        onClick={handleLogout}
      >
        {/* Animated gradient overlay */}
        <div className="
    absolute inset-0
    bg-gradient-to-r from-transparent via-white/20 to-transparent
    translate-x-[-100%] group-hover:translate-x-[100%]
    transition-transform duration-700
  " />

        {/* Glowing effect on hover */}
        <div className="
    absolute -inset-1
    bg-gradient-to-r from-[#CA915F]/50 via-[#E3B07E]/50 to-[#B87440]/50
    rounded-xl
    opacity-0 group-hover:opacity-100
    blur-md
    transition-opacity duration-500
    -z-10
  " />

        {/* Corner accents */}
        <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#FFFED7]/50 group-hover:border-[#FFFED7] rounded-tl-lg transition-all duration-300" />
        <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#FFFED7]/50 group-hover:border-[#FFFED7] rounded-tr-lg transition-all duration-300" />
        <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#FFFED7]/50 group-hover:border-[#FFFED7] rounded-bl-lg transition-all duration-300" />
        <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#FFFED7]/50 group-hover:border-[#FFFED7] rounded-br-lg transition-all duration-300" />



        {/* Button text */}
        <span className="relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] text-[#4A1237] text-xl font-bold font-play ">
          LOGOUT
        </span>

        {/* Ripple effect on hover */}
        <div className="
    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
    w-0 h-0
    rounded-full
    bg-white/20
    group-hover:w-[200px] group-hover:h-[200px]
    transition-all duration-700
    opacity-0 group-hover:opacity-100
  " />
      </button>

    </div>

  );
};

export default Navbar;
