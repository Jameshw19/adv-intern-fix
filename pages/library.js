import ForYouHeader from "@/Components/ForYouHeader";
import ForYouSideBar from "@/Components/ForYouSideBar";
import React from "react";

function library() {
  return (
    <>
      <div className="relative flex flex-col ml-[200px] transition-all">
        <ForYouHeader />
        <ForYouSideBar />
      </div>
    </>
  );
}

export default library;
