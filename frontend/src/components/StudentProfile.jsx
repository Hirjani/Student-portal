import React, { useState, useRef, useEffect } from "react";
import axiosInstance from "./../axios/axiosInstance";
import { errorToast, successToast } from "./../lib/toast";

const StudentProfileForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    photoFile: null,
    resumeUrl: "",
    photoUrl: "",
    contactNumber: "",
    currentCity: "",
    gender: "",
    languages: [],
    resumeFile: null,
    resumeFileName: "",
    skills: [],
    careerObjective: "",
    education: [
      {
        degree: "",
        major: "",
        institution: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    workExperience: [
      {
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    extraCurricularActivities: [],
    trainingsCourses: [],
    academicPersonalProjects: [
      {
        title: "",
        description: "",
        projectUrl: "",
      },
    ],
    portfolioWorkSamples: [
      {
        title: "",
        url: "",
        description: "",
      },
    ],
    accomplishmentsAdditionalDetails: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProfileDataLoading, setIsProfileDataLoading] = useState(false);

  const [tempInputs, setTempInputs] = useState({
    language: "",
    skill: "",
    activity: "",
    training: "",
    accomplishment: "",
  });

  const photoInputRef = useRef(null);
  const resumeInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTempInputChange = (e) => {
    const { name, value } = e.target;
    setTempInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photoFile: file,
        photoUrl: URL.createObjectURL(file),
      }));
    }
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        resumeFile: file,
        resumeFileName: file.name,
        resumeUrl: URL.createObjectURL(file),
      }));
    }
  };

  const addArrayItem = (field, value) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], value.trim()],
      }));
      setTempInputs((prev) => ({
        ...prev,
        [field.replace(/s$/, "")]: "",
      }));
    }
  };

  const removeArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleNestedChange = (section, index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addNestedItem = (section) => {
    const templates = {
      education: {
        degree: "",
        major: "",
        institution: "",
        startDate: "",
        endDate: "",
        description: "",
      },
      workExperience: {
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
      academicPersonalProjects: {
        title: "",
        description: "",
        projectUrl: "",
      },
      portfolioWorkSamples: {
        title: "",
        url: "",
        description: "",
      },
    };

    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], templates[section]],
    }));
  };

  const removeNestedItem = (section, index) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();

    // Append files
    if (formData.photoFile) {
      submitData.append("photo", formData.photoFile);
    }
    if (formData.resumeFile) {
      submitData.append("resume", formData.resumeFile);
    }

    // Append other form data
    Object.keys(formData).forEach((key) => {
      if (
        !["photoFile", "photoUrl", "resumeFile", "resumeFileName"].includes(key)
      ) {
        if (Array.isArray(formData[key])) {
          submitData.append(key, JSON.stringify(formData[key]));
        } else {
          if (key === "user") {
            submitData.append(key, formData[key]._id);
          } else {
            submitData.append(key, formData[key]);
          }
        }
      }
    });

    try {
      const response = await axiosInstance.put(
        "/api/user/student/profile",
        submitData
      );

      if (response.status === 200) {
        successToast("Profile saved successfully!");
      } else {
        errorToast("Error saving profile");
      }
    } catch (error) {
      console.error("Error:", error);
      errorToast("Error saving profile");
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsProfileDataLoading(true);
      try {
        const response = await axiosInstance.get("/api/user/student/profile");
        if (response.status === 200) {
          setFormData({
            ...response.data,
          });
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsProfileDataLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Student Profile
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Personal Information
          </h2>

          {/* Photo Upload */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <img
                src={formData.photoUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 cursor-pointer"
                onClick={() => photoInputRef.current.click()}
              />
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>
            <span className="text-xs text-gray-500 mt-1">Profile picture</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Current City
              </label>
              <input
                type="text"
                name="currentCity"
                value={formData.currentCity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Gender
              </label>
              <div className="flex gap-4">
                {["Male", "Female", "Others"].map((option) => (
                  <label key={option} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value={option}
                      checked={formData.gender === option}
                      onChange={handleInputChange}
                      className="accent-blue-500"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Resume Upload */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Resume</h2>
          <div className="flex items-center gap-4">
            <button
              style={{ maxWidth: "fit-content" }}
              type="button"
              onClick={() => resumeInputRef.current.click()}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            >
              Upload Resume
            </button>
            <input
              ref={resumeInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
              className="hidden"
            />
            {formData.resumeFileName && (
              <span className="text-sm text-gray-600">
                {formData.resumeFileName}
              </span>
            )}
            <a href={formData?.resumeUrl}></a>
          </div>
        </section>

        {/* Career Objective */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Career Objective
          </h2>
          <textarea
            name="careerObjective"
            value={formData.careerObjective}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your career objective..."
          />
        </section>

        {/* Languages */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Languages
          </h2>
          <div className="space-y-3">
            <div className="flex gap-2 justify-center items-center">
              <input
                type="text"
                name="language"
                value={tempInputs.language}
                onChange={handleTempInputChange}
                placeholder="Add a language"
                className="grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <button
                type="button"
                style={{ maxWidth: "fit-content" }}
                onClick={() => addArrayItem("languages", tempInputs.language)}
                className="px-3 py-1 grow-none bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.languages.map((lang, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {lang}
                  <span
                    type="span"
                    onClick={() => removeArrayItem("languages", index)}
                    className="ml-2 text-blue-600 hover:text-blue-800 text-sm cursor-pointer"
                  >
                    ×
                  </span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Skills</h2>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                name="skill"
                value={tempInputs.skill}
                onChange={handleTempInputChange}
                placeholder="Add a skill"
                className="grow w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => addArrayItem("skills", tempInputs.skill)}
                style={{ maxWidth: "fit-content" }}
                className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                >
                  {skill}
                  <span
                    type="span"
                    onClick={() => removeArrayItem("skills", index)}
                    className="ml-2 text-green-600 hover:text-green-800 text-sm cursor-pointer"
                  >
                    ×
                  </span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Education</h2>
            <button
              type="button"
              style={{ maxWidth: "fit-content" }}
              onClick={() => addNestedItem("education")}
              className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
            >
              Add Education
            </button>
          </div>
          {formData.education.map((edu, index) => (
            <div
              key={index}
              className="border border-gray-200 p-4 rounded-lg mb-4 bg-white"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-gray-600">
                  Education {index + 1}
                </h3>
                {formData.education.length > 1 && (
                  <button
                    type="button"
                    style={{ maxWidth: "fit-content" }}
                    onClick={() => removeNestedItem("education", index)}
                    className="px-2 py-1 text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) =>
                    handleNestedChange(
                      "education",
                      index,
                      "degree",
                      e.target.value
                    )
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Major"
                  value={edu.major}
                  onChange={(e) =>
                    handleNestedChange(
                      "education",
                      index,
                      "major",
                      e.target.value
                    )
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) =>
                    handleNestedChange(
                      "education",
                      index,
                      "institution",
                      e.target.value
                    )
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={edu.startDate}
                    onChange={(e) =>
                      handleNestedChange(
                        "education",
                        index,
                        "startDate",
                        e.target.value
                      )
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="date"
                    value={edu.endDate}
                    onChange={(e) =>
                      handleNestedChange(
                        "education",
                        index,
                        "endDate",
                        e.target.value
                      )
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <textarea
                placeholder="Description"
                value={edu.description}
                onChange={(e) =>
                  handleNestedChange(
                    "education",
                    index,
                    "description",
                    e.target.value
                  )
                }
                rows="2"
                className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </section>

        {/* Work Experience */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Work Experience
            </h2>
            <button
              type="button"
              onClick={() => addNestedItem("workExperience")}
              style={{ maxWidth: "fit-content" }}
              className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
            >
              Add Experience
            </button>
          </div>
          {formData.workExperience.map((exp, index) => (
            <div
              key={index}
              className="border border-gray-200 p-4 rounded-lg mb-4 bg-white"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-gray-600">
                  Experience {index + 1}
                </h3>
                {formData.workExperience.length > 1 && (
                  <button
                    type="button"
                    style={{ maxWidth: "fit-content" }}
                    onClick={() => removeNestedItem("workExperience", index)}
                    className="px-2 py-1 text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Job Title"
                  value={exp.title}
                  onChange={(e) =>
                    handleNestedChange(
                      "workExperience",
                      index,
                      "title",
                      e.target.value
                    )
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) =>
                    handleNestedChange(
                      "workExperience",
                      index,
                      "company",
                      e.target.value
                    )
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={exp.location}
                  onChange={(e) =>
                    handleNestedChange(
                      "workExperience",
                      index,
                      "location",
                      e.target.value
                    )
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={exp.startDate}
                    onChange={(e) =>
                      handleNestedChange(
                        "workExperience",
                        index,
                        "startDate",
                        e.target.value
                      )
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="date"
                    value={exp.endDate}
                    onChange={(e) =>
                      handleNestedChange(
                        "workExperience",
                        index,
                        "endDate",
                        e.target.value
                      )
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <textarea
                placeholder="Job Description"
                value={exp.description}
                onChange={(e) =>
                  handleNestedChange(
                    "workExperience",
                    index,
                    "description",
                    e.target.value
                  )
                }
                rows="2"
                className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </section>

        {/* Extra Curricular Activities */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Extra Curricular Activities
          </h2>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                name="activity"
                value={tempInputs.activity}
                onChange={handleTempInputChange}
                placeholder="Add an activity"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() =>
                  addArrayItem("extraCurricularActivities", tempInputs.activity)
                }
                style={{ maxWidth: "fit-content" }}
                className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
              >
                Add
              </button>
            </div>
            <div className="space-y-2">
              {formData.extraCurricularActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 bg-white rounded border"
                >
                  <span className="text-sm">{activity}</span>
                  <button
                    type="button"
                    style={{ maxWidth: "fit-content" }}
                    onClick={() =>
                      removeArrayItem("extraCurricularActivities", index)
                    }
                    className="px-2 py-1 text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trainings & Courses */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Trainings & Courses
          </h2>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                name="training"
                value={tempInputs.training}
                onChange={handleTempInputChange}
                placeholder="Add a training or course"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() =>
                  addArrayItem("trainingsCourses", tempInputs.training)
                }
                style={{ maxWidth: "fit-content" }}
                className="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600"
              >
                Add
              </button>
            </div>
            <div className="space-y-2">
              {formData.trainingsCourses.map((training, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 bg-white rounded border"
                >
                  <span className="text-sm">{training}</span>
                  <button
                    type="button"
                    style={{ maxWidth: "fit-content" }}
                    onClick={() => removeArrayItem("trainingsCourses", index)}
                    className="px-2 py-1 text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Academic & Personal Projects */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Academic & Personal Projects
            </h2>
            <button
              style={{ maxWidth: "fit-content" }}
              type="button"
              onClick={() => addNestedItem("academicPersonalProjects")}
              className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
            >
              Add Project
            </button>
          </div>
          {formData.academicPersonalProjects.map((project, index) => (
            <div
              key={index}
              className="border border-gray-200 p-4 rounded-lg mb-4 bg-white"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-gray-600">
                  Project {index + 1}
                </h3>
                {formData.academicPersonalProjects.length > 1 && (
                  <button
                    type="button"
                    style={{ maxWidth: "fit-content" }}
                    onClick={() =>
                      removeNestedItem("academicPersonalProjects", index)
                    }
                    className="px-2 py-1 text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={project.title}
                  onChange={(e) =>
                    handleNestedChange(
                      "academicPersonalProjects",
                      index,
                      "title",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="url"
                  placeholder="Project URL"
                  value={project.projectUrl}
                  onChange={(e) =>
                    handleNestedChange(
                      "academicPersonalProjects",
                      index,
                      "projectUrl",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Project Description"
                  value={project.description}
                  onChange={(e) =>
                    handleNestedChange(
                      "academicPersonalProjects",
                      index,
                      "description",
                      e.target.value
                    )
                  }
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}
        </section>

        {/* Portfolio & Work Samples */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Portfolio & Work Samples
            </h2>
            <button
              type="button"
              style={{ maxWidth: "fit-content" }}
              onClick={() => addNestedItem("portfolioWorkSamples")}
              className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
            >
              Add Sample
            </button>
          </div>
          {formData.portfolioWorkSamples.map((sample, index) => (
            <div
              key={index}
              className="border border-gray-200 p-4 rounded-lg mb-4 bg-white"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-gray-600">
                  Sample {index + 1}
                </h3>
                {formData.portfolioWorkSamples.length > 1 && (
                  <button
                    type="button"
                    style={{ maxWidth: "fit-content" }}
                    onClick={() =>
                      removeNestedItem("portfolioWorkSamples", index)
                    }
                    className="px-2 py-1 text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Sample Title"
                  value={sample.title}
                  onChange={(e) =>
                    handleNestedChange(
                      "portfolioWorkSamples",
                      index,
                      "title",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="url"
                  placeholder="Sample URL"
                  value={sample.url}
                  onChange={(e) =>
                    handleNestedChange(
                      "portfolioWorkSamples",
                      index,
                      "url",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Sample Description"
                  value={sample.description}
                  onChange={(e) =>
                    handleNestedChange(
                      "portfolioWorkSamples",
                      index,
                      "description",
                      e.target.value
                    )
                  }
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}
        </section>

        {/* Accomplishments & Additional Details */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Accomplishments & Additional Details
          </h2>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                name="accomplishment"
                value={tempInputs.accomplishment}
                onChange={handleTempInputChange}
                placeholder="Add an accomplishment"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                style={{ maxWidth: "fit-content" }}
                type="button"
                onClick={() =>
                  addArrayItem(
                    "accomplishmentsAdditionalDetails",
                    tempInputs.accomplishment
                  )
                }
                className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
              >
                Add
              </button>
            </div>
            <div className="space-y-2">
              {formData.accomplishmentsAdditionalDetails.map(
                (accomplishment, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 bg-white rounded border"
                  >
                    <span className="text-sm">{accomplishment}</span>
                    <button
                      type="button"
                      style={{ maxWidth: "fit-content" }}
                      onClick={() =>
                        removeArrayItem(
                          "accomplishmentsAdditionalDetails",
                          index
                        )
                      }
                      className="px-2 py-1 text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* Submit Button */}
        <div className="text-center">
          <button
            style={{ maxWidth: "fit-content" }}
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentProfileForm;
