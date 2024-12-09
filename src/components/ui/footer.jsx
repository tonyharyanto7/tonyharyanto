import React from "react";

const Footer = ({ config }) => {
  return (
    <footer className="animate-pop_in bg-white/5 shadow-xl text-white py-4 rounded-xl mx-3 lg:mx-3 mb-3">
      <div className="container mx-auto text-center">
        {config.footer && (
          <>
            {config.footer.links && (
              <div className="flex justify-center space-x-4 mt-2 mb-2">
                {config.footer.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:scale-110 duration-75 c-cursor-pointer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
            <p>{config.footer.text}</p>
          </>
        )}
      </div>
    </footer>
  );
};

export default Footer;
