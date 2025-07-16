"use client";
import React, { useState } from "react";
import Loader from "./Loader";
import SmoothScroll from "./SmoothScroll";

const ClientRoot = ({ children }: { children: React.ReactNode }) => {
  const [showLoader, setShowLoader] = useState(true);
  return (
    <>
      {showLoader && <Loader onEnd={() => setShowLoader(false)} />}
      {!showLoader && (
        <>
          <div className="gradient-bg-animation"></div>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </>
      )}
    </>
  );
};

export default ClientRoot;
