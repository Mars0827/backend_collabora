import React from "react";

const MatchPage = () => {
  return (
    <div
      className="h-screen bg-black text-white flex justify-center items-center pt-20"
      style={{ height: "calc(100vh - 5rem)" }}
    >
      <div className="max-w-4xl w-full p-8 rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          You’re just one step closer!
        </h1>
        <p className="text-center text-gray-300 mb-8">
          Select topics you want to learn so that we can pair you with someone
          who shares the same interest.
        </p>
        <div className="grid grid-cols-2 gap-8">
          {/* Topics Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Topics</h2>
            <p className="text-sm text-gray-400 mb-4">
              Select topics you&apos;d like to study (you may choose more than one)
            </p>
            <div className="space-y-4">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="text-gray-300" />
                <span>Academic (e.g., Math, Science, Literature)</span>
              </label>
              <input
                type="text"
                placeholder="--Please specify--"
                className="w-full bg-gray-800 text-sm text-gray-400 p-2 rounded-md"
              />
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="text-gray-300" />
                <span>
                  Personal Development (e.g., Time Management, Language
                  Learning)
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="text-gray-300" />
                <span>Skills (e.g., Coding, Design, Music)</span>
              </label>
              <input
                type="text"
                placeholder="--Please specify--"
                className="w-full bg-gray-800 text-sm text-gray-400 p-2 rounded-md"
              />
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="text-gray-300" />
                <span>
                  Career Development (e.g., Job Interview Prep, Resume
                  Building)
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="text-gray-300" />
                <span>Health & Fitness (e.g., Nutrition, Exercise)</span>
              </label>
            </div>
            <input
              type="text"
              placeholder="What specific area or goal are you focusing on? (Optional)"
              className="w-full bg-gray-800 text-sm text-gray-400 p-2 rounded-md mt-4"
            />
          </div>
          {/* Preferred Schedule Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Preferred Schedule</h2>
            <p className="text-sm text-gray-400 mb-4">
              When are you available for study sessions?
            </p>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="text-gray-300" />
                <span>Weekdays (Mon–Fri)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="text-gray-300" />
                <span>Weekends (Sat–Sun)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="text-gray-300" />
                <span>Morning (6 AM–12 PM)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="text-gray-300" />
                <span>Afternoon (12 PM–6 PM)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="text-gray-300" />
                <span>Evening (6 PM–9 PM)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="text-gray-300" />
                <span>Night (9 PM–12 AM)</span>
              </label>
              <input
                type="text"
                placeholder="Other (Please Specify):"
                className="w-full bg-gray-800 text-sm text-gray-400 p-2 rounded-md"
              />
            </div>
            <h3 className="text-sm font-medium mt-6 mb-2">How long do you usually study?</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="text-gray-300" />
                <span>1 hour</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="text-gray-300" />
                <span>2 hours</span>
              </label>
              <input
                type="text"
                placeholder="Other (Please Specify):"
                className="w-full bg-gray-800 text-sm text-gray-400 p-2 rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-8">
          <button className="text-gray-400 border border-gray-400 px-6 py-2 rounded-md hover:bg-gray-800">
            Skip
          </button>
          <button className="bg-white text-black px-6 py-2 rounded-md hover:bg-gray-200">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchPage;
