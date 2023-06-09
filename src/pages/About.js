import React from "react";
import marcus from "../assets/about/marcusPicture.png";
import adas from "../assets/about/adasPicture.jpg";
import jared from "../assets/about/jaredPicture.png";
import skipper from "../assets/about/skipperPicture.png";

const teamMembers = [
  {
    name: "Marcus David Alo",
    role: "Head Website Developer",
    image: marcus,
  },
  {
    name: "Mahdi Atef Adas",
    role: "Website Developer",
    image: adas,
  },
  {
    name: "Jared Eiden Belvis",
    role: "Website Developer",
    image: jared,
  },
  {
    name: "Skipper Paloma",
    role: "Website Developer",
    image: skipper,
  },
];

function About() {
  return (
    <main className="flex justify-center my-20 mx-5">
      <div className="container flex justify-center items-center flex-col sm:flex-row">
        <div className="bg-[rgba(31,41,55,0.5)] h-full w-full md:1/2 dark:bg-[rgba(255,255,255,0.75)] p-8 rounded shadow text-white dark:text-gray-800 m-2">
          <h1 className="text-4xl font-bold mb-6 text-cyan-500">About</h1>
          <p className="mb-4 text-justify">
            Welcome to{" "}
            <span className="font-bold text-cyan-500">PlayKoDEX</span>! We are a
            passionate community-driven website dedicated to enhancing your
            gaming experience. Our mission is to provide you with the latest
            trends, insights, and comprehensive information about your favorite
            games.
          </p>
          <p className="mb-4 text-justify">
            At <span className="font-bold text-cyan-500">PlayKoDEX</span>, we
            understand the power of gaming and the joy it brings. That's why our
            team of avid gamers has carefully crafted a platform to cater to
            your gaming needs. We go above and beyond to curate a wide range of
            data archives and up-to-date content, ensuring you have access to
            the most relevant and accurate information.
          </p>
          <p className="mb-4 text-justify">
            By leveraging the RAWG API, we gather essential details such as
            release dates, ratings, and images, delivering a seamless and
            comprehensive gaming experience. Additionally, we utilize the
            NewsCatcherAPI to bring you the latest news, updates, and articles
            for each game, keeping you well-informed about the gaming world.
          </p>
          <p className="mb-4 text-justify">
            Our dedication stems from our genuine passion for gaming. We strive
            to create a unique space where you can explore the Best of the Year,
            discover New Releases, and revisit timeless classics. Whether you're
            looking for your next gaming adventure or seeking information on
            your favorite titles,{" "}
            <span className="font-bold text-cyan-500">PlayKoDEX</span> is here
            to assist you every step of the way.
          </p>
          <p className=" text-justify">
            We sincerely hope that{" "}
            <span className="font-bold text-cyan-500">PlayKoDEX</span> becomes
            your go-to resource for all things gaming. If you have any questions
            or feedback, our team is always ready to assist you. Get ready to
            embark on unforgettable gaming journeys with us. Happy gaming!
          </p>
        </div>
        <div className="bg-[rgba(31,41,55,0.5)] h-full w-full md:w-1/2 dark:bg-[rgba(255,255,255,0.75)] p-8 rounded-md shadow box-border m-2">
          <h2 className="text-2xl font-bold mb-4 text-cyan-500">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamMembers.map((member, index) => (
              <div
                className="flex flex-col items-center"
                key={member.name}
                data-aos="fade-down"
                data-aos-delay={(index + 1) * 100}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-40 w-40 mb-2 bg-cyan-400/70 rounded-full object-cover"
                />
                <div className="text-lg font-bold mt-2 text-white dark:text-gray-800">
                  {member.name.split("").map((letter, index) => (
                    <span
                      key={index}
                      data-aos="fade-down"
                      data-aos-delay={(index + 1) * 100}
                    >
                      {letter}
                    </span>
                  ))}
                </div>

                <div className="text-gray-300 dark:text-gray-500 text-center">
                  {member.role.split("").map((letter, index) => (
                    <span
                      key={index}
                      data-aos="fade-down"
                      data-aos-delay={(index + 1) * 100}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default About;
