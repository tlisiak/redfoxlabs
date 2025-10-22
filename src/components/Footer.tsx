const Footer = () => {
  return (
    <footer className="bg-brown-outline text-cream py-8 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Red Fox Labs LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
