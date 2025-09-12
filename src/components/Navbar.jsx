import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="mt-[1.3%] w-[80%] h-[8%] rounded-[50px] p-2 bg-[#292929] mx-auto flex justify-between items-center tracking-wide">
      {/* Logo */}
      <div className="pl-8 text-4xl text-center font-bold text-[#FFFFFF] leading-[100%]">
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
          to="/question-hub"
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

        <NavLink
          to="/results"
          className={({ isActive }) =>
            `text-md text-center font-bold leading-[100%] ${
              isActive
                ? "text-[#CAFF33]"
                : "text-[#FFFFFF] hover:text-[#CAFF33]"
            }`
          }
        >
          RESULTS
        </NavLink>
      </div>

      {/* Logout Button */}
      <button className="mr-2 bg-[#CAFF33] border-[2px] border-[#4a5f12] p-4  rounded-[50px] text-sm text-center font-extrabold text-[#191919] leading-[100%] hover:bg-[#292929] hover:text-[#CAFF33] cursor-pointer duration-300">
        LOGOUT
      </button>
    </div>
  );
};

export default Navbar;
