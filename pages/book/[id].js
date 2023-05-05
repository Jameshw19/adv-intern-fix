import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ForYouHeader from "@/Components/ForYouHeader";
import ForYouSideBar from "@/Components/ForYouSideBar";
import BookMain from "@/Components/BookMain";

function BookPage() {
  const router = useRouter();
  const { id } = router.query;
  const [bookData, setBookData] = useState([]);

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
        <BookMain bookData={bookData} bookid={id} />
      </div>
    </>
  );
}

// export async function getServerSideProps({ params }) {
//   const router = useRouter();
//   const { id } = router.query;
//   console.log(id);

//   const response = await fetch(
//     `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
//   );
//   const bookData = await response.json();

//   return {
//     props: { bookData },
//   };
// }

export default BookPage;
