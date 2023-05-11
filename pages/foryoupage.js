import React, { useEffect, useState } from "react";
import ForYouHeader from "../Components/ForYouHeader";
import ForYouSideBar from "../Components/ForYouSideBar";
import ForYouMain from "@/Components/ForYouMain";

function ForYouPage() {
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth > 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <div className="relative flex flex-col ml-[200px] w-[calc(100%-200px)] transition-all duration-[.3] max-md:ml-0 max-md:w-full">
        <ForYouHeader />
        {showSidebar && <ForYouSideBar />}
        <ForYouMain />
      </div>
    </>
  );
}

export default ForYouPage;
