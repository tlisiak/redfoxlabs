import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ContactModal from "@/components/ContactModal";
import foxIcon from "@/assets/redfox-mascot.png";

const NotFound = () => {
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-beige px-4">
      <div className="text-center max-w-lg">
        <img
          src={foxIcon}
          alt=""
          width={160}
          height={160}
          draggable={false}
          className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6 drop-shadow-lg select-none animate-fade-in"
        />

        <h1 className="text-4xl sm:text-5xl font-bold text-red-fox mb-4">
          Oops! Page Not Found
        </h1>

        <p className="text-xl text-foreground mb-8 leading-relaxed">
          Looks like this fox went down the wrong trail. Let's get you back on track!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button variant="organic" size="lg" asChild>
            <a href="/">Go Home</a>
          </Button>
          <Button variant="outline" size="lg" onClick={() => setModalOpen(true)}>
            Get in touch
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          Or <a href="/peek/" className="underline underline-offset-4 hover:text-red-fox transition-colors">take a peek</a> somewhere beautiful while you're here.
        </p>
      </div>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default NotFound;
