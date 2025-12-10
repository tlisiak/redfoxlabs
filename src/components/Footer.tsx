const Footer = () => {
  return (
    <footer className="bg-red-fox py-6 px-4">
      <div className="max-w-7xl mx-auto text-center text-sm text-white/70">
        <p>© {new Date().getFullYear()} Red Fox Labs LLC. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
