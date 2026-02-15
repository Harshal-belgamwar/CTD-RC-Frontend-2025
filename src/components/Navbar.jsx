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
       bg-[#1a1625]
    text-[#CA915F] font-bold font-play text-xl
    px-8 py-3
    rounded-lg
    border-2 border-[#CA915F]
    hover:bg-[#CA915F] hover:text-[#FFFED7]
    hover:border-[#E3B07E]
    active:scale-95
    transform transition-all duration-200
    tracking-wider
    shadow-lg hover:shadow-xl
  "
        onClick={handleLogout}
      >
        LOGOUT
      </button>
    </div>

  );
};

export default Navbar;
