import { WaveDivider } from "@/components/ui/WaveDivider";

const Footer = () => {
  return (
    <footer className="relative bg-foreground">
      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-handwritten text-xl text-white/80 mb-2">Made with care in the Bay Area</p>
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Red Fox Labs LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
