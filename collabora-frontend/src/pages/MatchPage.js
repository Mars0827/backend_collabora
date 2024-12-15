import React, { useState } from "react";
import { db } from "../firebase"; // Ensure the path is correct
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const MatchPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    topics: {
      academic: false,
      academicDetails: "",
      personalDevelopment: false,
      skills: false,
      skillsDetails: "",
      careerDevelopment: false,
      healthFitness: false,
      goalFocus: "",
    },
    schedule: {
      weekdays: false,
      weekends: false,
      morning: false,
      afternoon: false,
      evening: false,
      night: false,
      other: "",
    },
    studyDuration: {
      oneHour: false,
      twoHours: false,
      other: "",
    },
  });

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, "matches"), formData);
      alert("Data saved successfully!");
      navigate("/")
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data.");
    }
  };

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
                <input
                  type="checkbox"
                  onChange={(e) =>
                    handleChange("topics", "academic", e.target.checked)
                  }
                />
                <span>Academic (e.g., Math, Science, Literature)</span>
              </label>
              <input
                type="text"
                placeholder="--Please specify--"
                className="w-full bg-gray-800 text-sm text-gray-400 p-2 rounded-md"
                onChange={(e) =>
                  handleChange("topics", "academicDetails", e.target.value)
                }
              />
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    handleChange(
                      "topics",
                      "personalDevelopment",
                      e.target.checked
                    )
                  }
                />
                <span>
                  Personal Development (e.g., Time Management, Language
                  Learning)
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    handleChange("topics", "skills", e.target.checked)
                  }
                />
                <span>Skills (e.g., Coding, Design, Music)</span>
              </label>
              <input
                type="text"
                placeholder="--Please specify--"
                className="w-full bg-gray-800 text-sm text-gray-400 p-2 rounded-md"
                onChange={(e) =>
                  handleChange("topics", "skillsDetails", e.target.value)
                }
              />
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    handleChange("topics", "careerDevelopment", e.target.checked)
                  }
                />
                <span>
                  Career Development (e.g., Job Interview Prep, Resume
                  Building)
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    handleChange("topics", "healthFitness", e.target.checked)
                  }
                />
                <span>Health & Fitness (e.g., Nutrition, Exercise)</span>
              </label>
            </div>
            <input
              type="text"
              placeholder="What specific area or goal are you focusing on? (Optional)"
              className="w-full bg-gray-800 text-sm text-gray-400 p-2 rounded-md mt-4"
              onChange={(e) =>
                handleChange("topics", "goalFocus", e.target.value)
              }
            />
          </div>
          {/* Preferred Schedule Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Preferred Schedule</h2>
            <p className="text-sm text-gray-400 mb-4">
              When are you available for study sessions?
            </p>
            <div className="space-y-2">
              {["weekdays", "weekends", "morning", "afternoon", "evening", "night"].map(
                (time) => (
                  <label className="flex items-center space-x-2" key={time}>
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        handleChange("schedule", time, e.target.checked)
                      }
                    />
                    <span>{time.charAt(0).toUpperCase() + time.slice(1)}</span>
                  </label>
                )
              )}
              <input
                type="text"
                placeholder="Other (Please Specify):"
                className="w-full bg-gray-800 text-sm text-gray-400 p-2 rounded-md"
                onChange={(e) =>
                  handleChange("schedule", "other", e.target.value)
                }
              />
            </div>
            <h3 className="text-sm font-medium mt-6 mb-2">
              How long do you usually study?
            </h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    handleChange("studyDuration", "oneHour", e.target.checked)
                  }
                />
                <span>1 hour</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    handleChange("studyDuration", "twoHours", e.target.checked)
                  }
                />
                <span>2 hours</span>
              </label>
              <input
                type="text"
                placeholder="Other (Please Specify):"
                className="w-full bg-gray-800 text-sm text-gray-400 p-2 rounded-md"
                onChange={(e) =>
                  handleChange("studyDuration", "other", e.target.value)
                }
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-8">
          <button
            className="text-gray-400 border border-gray-400 px-6 py-2 rounded-md hover:bg-gray-800"
            onClick={() => alert("Skipped!")}
          >
            Skip
          </button>
          <button
            className="bg-white text-black px-6 py-2 rounded-md hover:bg-gray-200"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchPage;