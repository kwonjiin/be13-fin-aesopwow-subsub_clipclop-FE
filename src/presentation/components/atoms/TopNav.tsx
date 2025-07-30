import { Link } from "react-router-dom";

export function TopNav() {
  return (
    <div className="w-full flex justify-center py-6">
      <div className="bg-[#f0f0e5] rounded-lg px-10 py-4 flex space-x-10 shadow-lg border-2 border-[#9c7866]">
        <Link to="/aboutus" className="text-gray no-underline hover:text-[#9c7866] transition">
          About Us
        </Link>
        <Link to="/howto" className="text-gray no-underline hover:text-[#9c7866] transition">
          How To?
        </Link>
        <Link to="/membership" className="text-gray no-underline hover:text-[#9c7866] transition">
          Membership
        </Link>
      </div>
    </div>
  );
}
