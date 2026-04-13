import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-2 px-3 p-md-4 text-center app-footer">
      <div>
        Copyright &copy;{" "}
        <time dateTime={String(year)}>{year}</time> Developers Experience
      </div>
    </footer>
  );
};

export default Footer;
