import React from "react";
import usePageTitle from "../hooks/useTitle";
import BestOfYear from "../components/home/BestOfYear";
import NewReleases from "../components/home/NewReleases";
import AllTimeTop from "../components/home/AllTimeTop";
function Home() {
  usePageTitle(`PlayKoDEX | Home`);

  return (
    <main className="flex justify-center overflow-hidden mb-10">
      <div className="container mt-10">
        <div className="flex flex-col border-box text-white dark:text-gray-800 col overflow-hidden px-4">
          <div className="my-5">
            <BestOfYear />
          </div>
          <div className="my-5">
            <NewReleases />
          </div>
          <div className="my-5">
            <AllTimeTop />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
