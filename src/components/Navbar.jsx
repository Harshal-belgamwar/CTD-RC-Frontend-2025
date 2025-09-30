import { NavLink ,useNavigate} from "react-router-dom";
import axios from "axios";

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
    <div className=" w-[80%] h-[8%] rounded-[50px] px-2 py-3 bg-[#292929] mx-auto flex justify-between items-center tracking-wide">
      {/* Logo */}
      <div className="pl-8 text-4xl text-center font-bold text-[#FFFFFF] leading-[100%] text-transparent bg-clip-text bg-gradient-to-r from-[#CAFF33] via-[#8BC34A] to-[#CAFF33]">
        RC
      </div>

      {/* Nav Links */}
      <div className="flex justify-evenly gap-15 items-center">
        <NavLink
          to="/instructions"
          className={({ isActive }) =>
            `text-md text-center font-bold leading-[100%] ${
              isActive
                ? "text-[#CAFF33]"
                : "text-[#FFFFFF] hover:text-[#CAFF33]"
            }`
          }
        >
          INSTRUCTIONS
        </NavLink>

        <NavLink
          to="/questionhub"
          className={({ isActive }) =>
            `text-md text-center font-bold leading-[100%] ${
              isActive
                ? "text-[#CAFF33]"
                : "text-[#FFFFFF] hover:text-[#CAFF33]"
            }`
          }
        >
          QUESTION HUB
        </NavLink>

        <NavLink
          to="/leaderboard"
          className={({ isActive }) =>
            `text-md text-center font-bold leading-[100%] ${
              isActive
                ? "text-[#CAFF33]"
                : "text-[#FFFFFF] hover:text-[#CAFF33]"
            }`
          }
        >
          LEADERBOARDS
        </NavLink>

       
      </div>

      {/* Logout Button */}
      <button 
      className="mr-2 bg-[#CAFF33] border-[2px] border-[#4a5f12] p-4  rounded-[50px] text-sm text-center font-extrabold text-[#191919] leading-[100%] hover:bg-[#292929] hover:text-[#CAFF33] cursor-pointer duration-300"
      onClick={handleLogout}
      >
        LOGOUT
      </button>
    </div>
  );
};

export default Navbar;
