import React from "react";

export default () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white mt-auto p-4 text-center">
      <div>Copyright &copy; {currentYear} Developers Experience</div>
    </footer>
  );
};
