import React from "react";
import { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="scroll-to-top-container">
      <button
        onClick={scrollToTop}
        className={`scroll-to-top ${isVisible ? "visible" : ""}`}
      >
        ↑
      </button>
    </div>
  );
};
export default ScrollToTop;
