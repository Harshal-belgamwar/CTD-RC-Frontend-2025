const Login = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#191919] bg-cover bg-center tracking-wide">
      <p className="absolute top-8 left-8 text-[#CAFF33] font-bold text-6xl tracking-wide">
        RC
      </p>
      <div className="backdrop-blur-lg p-10 rounded-[20px] w-full max-w-md flex flex-col items-center justify-center min-h-[500px] h-80 bg-[#191919] bg-[radial-gradient(circle_at_0%_0%,rgba(83,172,58,0.4)_0%,transparent_30%),radial-gradient(circle_at_100%_100%,rgba(83,172,58,0.4)_0%,transparent_30%)]">
        <h1 className="text-[#CAFF33] font-bold text-4xl mb-13">Login</h1>

        <form className="space-y-8 w-full">
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
              placeholder="Enter password"
              className="w-full px-4 py-3 bg-transparent border-[2px] border-[#3D633F] text-white rounded-[50px] focus:outline-none focus:ring-2 focus:ring-[#3D633F] placeholder:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#CAFF33] border-[2px] text-[#191919] font-extrabold mt-5 py-3 px-4 rounded-[50px] hover:bg-transparent hover:text-[#CAFF33] hover:border-[#3D633F] transition-colors cursor-pointer duration-300"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
