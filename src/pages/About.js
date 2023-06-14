import React from 'react';
import marcus from '../assets/about/marcusA.webp';
import adas from '../assets/about/adasM.webp';
import jared from '../assets/about/jaredB.webp';
import skipper from '../assets/about/skipperP.webp';

const teamMembers = [
  {
    name: 'Marcus David Alo',
    role: 'Head Website Developer',
    image: marcus,
  },
  {
    name: 'Mahdi Atef Adas',
    role: 'Website Developer',
    image: adas,
  },
  {
    name: 'Jared Eiden Belvis',
    role: 'Website Developer',
    image: jared,
  },
  {
    name: 'Skipper Paloma',
    role: 'Website Developer',
    image: skipper,
  },
];

function About() {
  return (
    <main className="flex justify-center my-20 mx-5">
      <div className="container flex justify-center items-center flex-col sm:flex-row">
        <div className="bg-[rgba(31,41,55,0.5)] h-full w-full md:1/2 dark:bg-[rgba(255,255,255,0.75)] p-8 rounded shadow text-white dark:text-gray-800 m-2">
          <h1 className="text-4xl font-bold mb-6">About</h1>
          <p className="mb-4">
            Welcome to GameLink! We are a passionate community-driven website
            dedicated to enhancing your gaming experience. Our mission is to
            provide you with the latest trends, insights, and comprehensive
            information about your favorite games.
          </p>
          <p className="mb-4">
            At GameLink, we understand the power of gaming and the joy it
            brings. That's why our team of avid gamers has carefully crafted a
            platform to cater to your gaming needs. We go above and beyond to
            curate a wide range of data archives and up-to-date content,
            ensuring you have access to the most relevant and accurate
            information.
          </p>
          <p className="mb-4">
            By leveraging the RAWG API, we gather essential details such as
            release dates, ratings, and images, delivering a seamless and
            comprehensive gaming experience. Additionally, we utilize the
            NewsCatcherAPI to bring you the latest news, updates, and articles
            for each game, keeping you well-informed about the gaming world.
          </p>
          <p className="mb-4">
            Our dedication stems from our genuine passion for gaming. We strive
            to create a unique space where you can explore the Best of the Year,
            discover New Releases, and revisit timeless classics. Whether you're
            looking for your next gaming adventure or seeking information on
            your favorite titles, GameLink is here to assist you every step of
            the way.
          </p>
          <p>
            We sincerely hope that GameLink becomes your go-to resource for all
            things gaming. If you have any questions or feedback, our team is
            always ready to assist you. Get ready to embark on unforgettable
            gaming journeys with us. Happy gaming!
          </p>
        </div>
        <div className="bg-[rgba(31,41,55,0.5)] h-full w-full md:w-1/2 dark:bg-[rgba(255,255,255,0.75)] p-8 rounded-md shadow box-border m-2">
          <h2 className="text-2xl font-bold mb-4 text-white dark:text-gray-800">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamMembers.map((member) => (
              <div className="flex flex-col items-center" key={member.name}>
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-40 w-40 mb-2 bg-cyan-400/70 rounded-full object-cover"
                />
                <div className="text-lg font-bold mt-2 text-white dark:text-gray-800">
                  {member.name}
                </div>
                <div className="text-gray-300 dark:text-gray-500">
                  {member.role}
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
