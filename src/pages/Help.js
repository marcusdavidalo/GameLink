import React from 'react';
import usePageTitle from '../hooks/useTitle';
import { ReactComponent as QuestionMark } from '../assets/icons/questionMark.svg';

const Help = () => {
  usePageTitle('PlayKoDEX | Help & Support');
  return (
    <section class="bg-gray-700/50 dark:bg-white/50">
  <div class="py-8 px-6 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
      <h2 class="mb-8 text-4xl tracking-tight font-extrabold text-white dark:text-black text-center">Frequently asked questions</h2>
      <div class="grid pt-8 text-left border-t border-gray-200 md:gap-16 dark:border-gray-700 md:grid-cols-1">
          <div>
              <div class="mb-10">
                  <h3 class="flex items-center mb-4 text-lg font-medium text-white dark:text-cyan-500">
                  <QuestionMark/>
                      How can I find information about a specific game on PlayKoDEX?

                  </h3>
                  <p class="text-cyan-500 dark:text-black">PlayKoDEX provides a user-friendly search feature that allows you to easily find information about a specific game. Simply enter the game's title in the search bar, and our platform will provide you with detailed information, including release dates, ratings, and images.</p>
              </div>
              <div class="mb-10">                        
                  <h3 class="flex items-center mb-4 text-lg font-medium text-white dark:text-cyan-500">
                  <QuestionMark/>
                      How frequently is the content on PlayKoDEX updated?
                  </h3>
                  <p class="text-cyan-500 dark:text-black">At PlayKoDEX, we understand the importance of staying up to date with the gaming world. That's why we strive to provide timely and relevant content. Our team regularly updates the platform to ensure you have access to the latest news, updates, and articles for each game. We work in partnership with the NewsCatcherAPI to bring you the most recent information.</p>
              </div>
              <div class="mb-10">
                  <h3 class="flex items-center mb-4 text-lg font-medium text-white dark:text-cyan-500">
                  <QuestionMark/>
Can I contribute to PlayKoDEX by adding information or reviews about games?

                      
                  </h3>
                  <p class="text-cyan-500 dark:text-black">Absolutely! PlayKoDEX is a community-driven platform, and we encourage user contributions. You can share your insights, reviews, and information about games by becoming a registered member. Simply create an account, and you'll be able to contribute to the PlayKoDEX community.
</p>
              </div>
              <div class="mb-10">
                  <h3 class="flex items-center mb-4 text-lg font-medium text-white dark:text-cyan-500">
                  <QuestionMark/>
                      How does PlayKoDEX select the "Best of the Year" and "New Releases" featured on the platform?

                  </h3>
                  <p class="text-cyan-500 dark:text-black">You can use PlayKoDEX's team of avid gamers carefully curates the "Best of the Year" and "New Releases" sections based on various factors such as critical acclaim, popularity, and community recommendations. We analyze game ratings, reviews, and industry trends to provide you with a comprehensive selection of the top games of the year and the latest releases.</p>
              </div>
          </div>
          <div>
          </div>
      </div>
  </div>
  <div>
      <div className="mx-auto max-w-screen-lg mt-1.5 pb-10 px-6">
        <div className="text-4xl font-bold mb-4 text-cyan-500 text-center">
          How can we help?
        </div>
          <div className="text-2xl font-bold text-white dark:text-black">
            Give us the details
          </div>
          <p className="pt-2 pb-3 text-sm text-white dark:text-black">
            Give us the details and please be specific as possible. If it's a
            bug please tell us the steps we need to take to recreate the issue,
            what you expected to happen, and what actually happened. We'll
            usually reply within a few hours.
          </p>
          <textarea 
            name=""
            id=""
            rows="10"
            className="rounded-lg w-full"
            placeholder="Enter your concerns"
          ></textarea>
          <button
            type="submit"
            class="bg-cyan-500 hover:bg-blue-600 mb-3 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mt-5"
          >
            Submit
          </button>

      </div>
    </div>
</section>
    
  );
};

export default Help;
