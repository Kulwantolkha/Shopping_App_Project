import { Navbar } from "../components/Navbar";
import { FaSearch } from "react-icons/fa";

const SearchPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col font-sans">
      <Navbar />
      <div className="py-8 px-10 bg-blue-50 text-blue-900">
        <h2 className="text-4xl font-extrabold mb-6 flex items-center gap-2">
          <FaSearch className="text-blue-600" /> Search
        </h2>
        <p className="text-lg">Search for products here.</p>
      </div>
    </div>
  );
};

export { SearchPage };