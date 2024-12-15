import React from 'react';

const ContactPage = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 p-10">
      <div className="shadow-md rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Contact us</h1>
        <p className="text-sm mb-6 text-grayFont">
          Got a question about how to have better meetings with your team? We&apos;ve got the answers.
        </p>
        
        <form>
          {/* Name Section */}
          <div className="flex space-x-4 mb-4">
            <div className="flex-1">
              <label htmlFor="firstName" className="block text-sm font-medium text-white">
                First Name*
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="John"
                className="h-11 mt-1 w-full bg-bgBlack border border-grayBorder2 rounded-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder:text-sm text-sm placeholder:text-grayBorder2"
                required
              />
            </div>
            <div className="flex-1">
            <label htmlFor="firstName" className="block text-sm font-medium text-white">
                Last Name*
              </label>
              <input
                type="text"
                placeholder="Doe"
                className="h-11 mt-1 w-full bg-bgBlack border border-grayBorder2 rounded-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder:text-sm text-sm placeholder:text-grayBorder2"
              />
            </div>
          </div>

          {/* Email Section */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Work Email*
            </label>
            <input
              type="email"
              id="email"
              placeholder="johndoe@gmail.com"
              className="h-11 mt-1 w-full bg-bgBlack border border-grayBorder2 rounded-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder:text-sm text-sm placeholder:text-grayBorder2"
              required
            />
          </div>

          {/* Dropdown Section */}
          <div className="mb-4">
            <label htmlFor="help" className="block text-sm font-medium text-white">
              How can we help?
            </label>
            <select
              id="help"
              className="h-11 mt-1 w-full bg-bgBlack border border-grayBorder2 rounded-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder:text-sm text-sm placeholder:text-grayBorder2"
            >
              <option>Support</option>
              <option>Feedback</option>
              <option>General Inquiry</option>
            </select>
          </div>

          {/* Comments Section */}
          <div className="mb-6">
            <label htmlFor="comments" className="block text-sm font-medium text-white">
              Comments
            </label>
            <textarea
              id="comments"
              rows="4"
              placeholder="Your comments here"
              className="w-full mt-1 bg-bgBlack border border-grayBorder2 rounded-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder:text-sm text-sm placeholder:text-grayBorder2"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blueButton text-white py-2 px-4 h-11 rounded-sm font-medium hover:bg-gray-800 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
