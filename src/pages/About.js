import React from 'react';
import marcus from '../assets/about/marcusA.webp';
import adas from '../assets/about/adasM.webp';
import jared from '../assets/about/jaredB.webp';
import skipper from '../assets/about/skipperP.webp';
import './About.css';

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
    <div className="flex justify-center my-20 mx-5">
      <div className="container flex justify-center items-center flex-col sm:flex-row">
        <div className="bg-[rgba(31,41,55,0.5)] h-full w-full md:1/2 dark:bg-[rgba(255,255,255,0.75)] p-8 rounded shadow text-white dark:text-gray-800 m-2">
          <h1 className="text-4xl font-bold mb-6">About</h1>
          <p className="mb-4">
            Greetings from GameLink! A website created by and for gamers. We are
            committed to bringing the neighborhood the most recent trends in by
            displaying data archives on the gaming industry and providing us
            with the most recent information on our favorite game.
          </p>
          <p className="mb-4">
            GameLink utilizes the RAWG API to gather information about games,
            including release dates, ratings, and images. We strive to bring you
            the most accurate and up-to-date information about the games you
            love.
          </p>
          <p className="mb-4">
            Our team is passionate about gaming and wants to share that passion
            with you. We carefully curate the Best of the Year, New Releases,
            and All Time Top games, so you can easily discover new titles or
            revisit timeless classics.
          </p>
          <p>
            We hope you enjoy exploring GameLink and find it helpful in
            discovering your next gaming adventure. If you have any questions or
            feedback, please don't hesitate to reach out to us. Happy gaming!
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
    </div>
  );
}

export default About;
