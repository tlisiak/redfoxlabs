import { Link } from "react-router-dom";
import foxIcon from "@/assets/redfox-mascot.png";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-center">
        <Link 
          to="/" 
          className="flex items-center gap-2 font-bold text-xl sm:text-2xl text-red-fox hover:opacity-90 transition-opacity"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img src={foxIcon} alt="Red Fox Labs" className="h-8 w-8 sm:h-10 sm:w-10" />
          Red Fox Labs
        </Link>
      </nav>
    </header>
  );
};

export default Header;
