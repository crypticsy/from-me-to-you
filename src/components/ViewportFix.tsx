import React, { useEffect } from "react";

export const ViewportFix: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  return <>{children}</>;
};
