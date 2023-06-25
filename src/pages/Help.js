import React from 'react';
import usePageTitle from '../hooks/useTitle';

const Help = () => {
  usePageTitle('PlayKoDEX | Help & Support');
  return (
    <div>
      <div className="mx-auto max-w-screen-sm my-5 px-10">
        <div className="text-4xl font-bold mb-4 text-gray-200 text-center">
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
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mt-5"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Help;
