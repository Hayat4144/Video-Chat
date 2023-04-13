import { Fragment } from "react";
import AsideNavbar from "./AsideNavbar";

const Home = () => {
  return (
    <Fragment>
      <main className="flex">
        <AsideNavbar className="aside" />
        <div className="home_page relative">
          <h1 className="text-5xl font-bold text-blue-800 text-center mt-5">
            Start convesation with your friend
          </h1>
        </div>
      </main>
    </Fragment>
  );
};

export default Home;
