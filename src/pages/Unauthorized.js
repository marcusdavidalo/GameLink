import React from 'react';
import usePageTitle from '../hooks/useTitle';

function Unauthorized() {
  usePageTitle(`PlayKoDEX | Unauthorized Access`);

  const unauthorizedText = `Unauthorized Access`.replace(/ /g, '\u00A0');

  const getRandomAnimationDirection = () => {
    const directions = ['up', 'down', 'left', 'right'];
    const randomIndex = Math.floor(Math.random() * directions.length);
    return directions[randomIndex];
  };

  return (
    <main className="flex justify-center my-20 mx-5">
      <div className="container flex justify-center items-center flex-col sm:flex-row">
        <div className="bg-[rgba(31,41,55,0.5)] h-full w-full md:1/2 dark:bg-[rgba(255,255,255,0.75)] p-8 rounded shadow text-white dark:text-gray-800 m-2">
          <div className="flex w-full text-5xl justify-center font-bold mt-2">
            {unauthorizedText.split('').map((letter, index) => (
              <span
                className="flex text-red-500 justify-center items-center animate-pulse"
                key={index}
                style={{
                  animationDelay: `${(index + 1) * 0.1}s`,
                }}
                data-aos={`fade-${getRandomAnimationDirection()}`}
                data-aos-delay={(index + 1) * 100}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Unauthorized;
