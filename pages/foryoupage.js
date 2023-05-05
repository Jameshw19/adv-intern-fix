import React from "react";
import ForYouHeader from "../Components/ForYouHeader";
import ForYouSideBar from "../Components/ForYouSideBar";
import ForYouMain from "@/Components/ForYouMain";

function ForYouPage() {
  return (
    <>
      <div className="relative flex flex-col ml-[200px] transition-all">
        <ForYouHeader />
        <ForYouSideBar />
        <ForYouMain />
      </div>
    </>
  );
}

export default ForYouPage;
