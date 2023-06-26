import React from 'react';
import usePageTitle from '../hooks/useTitle';

const Help = () => {
  usePageTitle('PlayKoDEX | Help & Support');
  return (
    <section class="bg-gray/50 dark:bg-white-900/50">
  <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
      <h2 class="mb-8 text-4xl tracking-tight font-extrabold text-cyan-500">Frequently asked questions</h2>
      <div class="grid pt-8 text-left border-t border-gray-200 md:gap-16 dark:border-gray-700 md:grid-cols-2">
          <div>
              <div class="mb-10">
                  <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                      <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                      How can I find information about a specific game on PlayKoDEX?

                  </h3>
                  <p class="text-gray-500 dark:text-gray-400">PlayKoDEX provides a user-friendly search feature that allows you to easily find information about a specific game. Simply enter the game's title in the search bar, and our platform will provide you with detailed information, including release dates, ratings, and images.</p>
              </div>
              <div class="mb-10">                        
                  <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                      <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                      How frequently is the content on PlayKoDEX updated?
                  </h3>
                  <p class="text-gray-500 dark:text-gray-400">At PlayKoDEX, we understand the importance of staying up to date with the gaming world. That's why we strive to provide timely and relevant content. Our team regularly updates the platform to ensure you have access to the latest news, updates, and articles for each game. We work in partnership with the NewsCatcherAPI to bring you the most recent information.</p>
              </div>
              <div class="mb-10">
                  <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                      <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg> 
Can I contribute to PlayKoDEX by adding information or reviews about games?

                      
                  </h3>
                  <p class="text-gray-500 dark:text-gray-400">Absolutely! PlayKoDEX is a community-driven platform, and we encourage user contributions. You can share your insights, reviews, and information about games by becoming a registered member. Simply create an account, and you'll be able to contribute to the PlayKoDEX community.
</p>
              </div>
              <div class="mb-10">
                  <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                      <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                      How does PlayKoDEX select the "Best of the Year" and "New Releases" featured on the platform?

                  </h3>
                  <p class="text-gray-500 dark:text-gray-400">You can use PlayKoDEX's team of avid gamers carefully curates the "Best of the Year" and "New Releases" sections based on various factors such as critical acclaim, popularity, and community recommendations. We analyze game ratings, reviews, and industry trends to provide you with a comprehensive selection of the top games of the year and the latest releases.</p>
              </div>
          </div>
          <div>
          </div>
      </div>
  </div>
  <div>
      <div className="mx-auto max-w-screen-sm my-5 px-10">
        <div className="text-4xl font-bold mb-4 text-cyan-500 text-center">
          How can we help?
        </div>
        <div className="bg-slate-800/50 py-8 mb-5 px-4 dark:bg-slate-200/70">
          <div className="text-2xl font-bold text-gray-200">
            Give us the details
          </div>
          <p className="pt-2 pb-3 text-sm text-gray-500 text-justify">
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
    </div>
</section>
    
  );
};

export default Help;
