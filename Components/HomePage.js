import Footer from "./Footer";
import Header from "./Header";
import HomeFeatures from "./HomeFeatures";
import HomeLanding from "./HomeLanding";
import HomeNumbers from "./HomeNumbers";
import HomeReviews from "./HomeReviews";
import SignIn from "./SignIn";

function HomePage() {
  return (
    <>
      <Header />
      <HomeLanding />
      <HomeFeatures />
      <HomeReviews />
      <HomeNumbers />
      <Footer />
    </>
  );
}

export default HomePage;
