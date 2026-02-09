import { Link } from "react-router-dom";
import foxIcon from "@/assets/redfox-mascot.png";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-center">
        <Link 
          to="/" 
          className="flex items-center gap-3 font-bold text-xl sm:text-2xl text-red-fox hover:opacity-90 transition-all hover:scale-[1.02]"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img 
            src={foxIcon} 
            alt="Red Fox Labs" 
            width={64}
            height={64}
            className="h-14 w-14 sm:h-16 sm:w-16 hover:animate-wiggle drop-shadow-lg"
          />
          <span className="font-handwritten text-3xl sm:text-4xl">Red Fox Labs</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
