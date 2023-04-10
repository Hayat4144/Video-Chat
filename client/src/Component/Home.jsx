import { Fragment } from "react";
import AsideNavbar from "./AsideNavbar";
import VideoCom from "./VideoCom";

const Home = () => {
  return (
    <Fragment>
      <main className="home_page flex">
        <AsideNavbar className="aside" />
        <div className="home_page">Start conversation with your friend</div>
      </main>
    </Fragment>
  );
};

export default Home;
