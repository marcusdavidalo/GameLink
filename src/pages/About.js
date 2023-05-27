import React from 'react';

function About() {
  const teamMembers = [
    {
      name: 'Marcus David Alo',
      role: 'Role Here',
    },
    {
      name: 'Mahdi Atef Adas',
      role: 'Role Here',
    },
    {
      name: 'Jared Eiden Belvis',
      role: 'Role Here',
    },
    {
      name: 'Skipper Paloma',
      role: 'Role Here',
    },
  ];

  return (
    <div className="flex justify-center my-20">
      <div className="container flex justify-center">
        <div className="bg-[rgba(31,41,55,0.5)] p-8 rounded shadow text-white">
          <h1 className="text-4xl font-bold mb-6">About</h1>
          <p className="mb-4">
            Welcome to our website! We are dedicated to providing you with the
            best gaming experience by showcasing the latest and greatest games
            in the industry.
          </p>
          <p className="mb-4">
            Our website utilizes the RAWG API to gather information about games,
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
            We hope you enjoy exploring our website and find it helpful in
            discovering your next gaming adventure. If you have any questions or
            feedback, please don't hesitate to reach out to us. Happy gaming!
          </p>
        </div>
        <div className="bg-[rgba(31,41,55,0.5)] p-8 rounded shadow ml-4">
          <h2 className="text-2xl font-bold mb-4 text-white">Our Team</h2>
          <div className="flex flex-wrap justify-center">
            {teamMembers.map((member, index) => (
              <div className="w-64 mx-4 mb-4" key={index}>
                <div className="bg-gray-600 h-40 mb-2"></div>
                <div className="text-lg font-bold mt-2 text-white">
                  {member.name}
                </div>
                <div className="text-gray-300">{member.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
