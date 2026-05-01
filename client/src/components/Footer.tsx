const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-5 py-4 border-top">
      <div className="container">
        <p className="text-muted small mb-2">
          <strong>Image Disclaimer </strong>
          <br />
          Product images are used for educational and non-commercial purposes
          only. All trademarks and images are the property of their respective
          owners.
        </p>
        <p className="text-muted small mb-0 text-center">
          &copy; {year} Youngil Kim
        </p>
      </div>
    </footer>
  );
};

export default Footer;
