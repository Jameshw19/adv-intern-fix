import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ForYouHeader from "@/Components/ForYouHeader";
import ForYouSideBar from "@/Components/ForYouSideBar";
import PlayerMain from "@/Components/PlayerMain";

function BookPage() {
  const router = useRouter();
  const [bookData, setBookData] = useState([]);
  const { id } = router.query;

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
        );
        const data = await res.json();
        setBookData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [id]);

  return (
    <>
      <div className="relative flex flex-col ml-[200px] transition-all ">
        <ForYouHeader />
        <ForYouSideBar />
        <PlayerMain bookData={bookData} bookid={id} />
      </div>
    </>
  );
}

export default BookPage;
