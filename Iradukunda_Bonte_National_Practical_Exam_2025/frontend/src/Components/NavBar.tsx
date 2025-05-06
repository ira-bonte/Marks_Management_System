import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/auth-page");
  };

  return (
    <nav className="relative flex items-center justify-between px-8 py-4 bg-white shadow-md">
      {/* Invisible spacer to reserve left space */}
      <div className="w-32" />

      {/* Centered links */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-6 text-indigo-700 font-semibold text-lg">
        <Link
          to="/view-trades"
          className="hover:text-indigo-900 transition-colors duration-200"
        >
          Trades
        </Link>
        <Link
          to="/view-trainees"
          className="hover:text-indigo-900 transition-colors duration-200"
        >
          Trainees
        </Link>
        <Link
          to="/view-modules"
          className="hover:text-indigo-900 transition-colors duration-200"
        >
          Modules
        </Link>
        <Link
          to="/view-marks"
          className="hover:text-indigo-900 transition-colors duration-200"
        >
          Marks
        </Link>
      </div>

      <button
        onClick={handleLogOut}
        className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition duration-300 cursor-pointer"
      >
        Logout
      </button>
    </nav>
  );
};

export default NavBar;
