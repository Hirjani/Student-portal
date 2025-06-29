// import React, { useState, useRef } from "react";

// const genderOptions = [
//   { label: "Female", value: "Female", icon: "👩" },
//   { label: "Male", value: "Male", icon: "👨" },
//   { label: "Others", value: "Others", icon: "🧑" },
// ];

// const languageOptions = [
//   "English",
//   "Hindi",
//   "Telugu",
//   "Tamil",
//   "Marathi",
//   "French",
//   "Japanese",
// ];

// const courseOptions = ["B.Tech", "BE", "B.Com", "MBA", "B.A"];

// const yearOptions = Array.from({ length: 10 }, (_, i) => {
//   const year = new Date().getFullYear() - i;
//   return { label: year, value: year };
// });

// const StudentProfile = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     contactNumber: "",
//     currentCity: "",
//     gender: "",
//     languages: [],
//     photoFile: null,
//     photoUrl: "",
//     resumeFile: null,
//     resumeUrl: "",
//     course: "",
//     college: "",
//     stream: "",
//     startYear: "",
//     endYear: "",
//   });

//   const [showAllCourses, setShowAllCourses] = useState(false);
//   const [showAllLanguages, setShowAllLanguages] = useState(false);
//   const [customLanguage, setCustomLanguage] = useState("");
//   const photoInputRef = useRef();
//   const resumeInputRef = useRef();

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Gender selection
//   const handleGenderSelect = (value) => {
//     setFormData((prev) => ({ ...prev, gender: value }));
//   };

//   // Language chips
//   const handleLanguageToggle = (lang) => {
//     setFormData((prev) => ({
//       ...prev,
//       languages: prev.languages.includes(lang)
//         ? prev.languages.filter((l) => l !== lang)
//         : [...prev.languages, lang],
//     }));
//   };

//   const handleAddCustomLanguage = () => {
//     if (
//       customLanguage.trim() &&
//       !formData.languages.includes(customLanguage.trim())
//     ) {
//       setFormData((prev) => ({
//         ...prev,
//         languages: [...prev.languages, customLanguage.trim()],
//       }));
//       setCustomLanguage("");
//     }
//   };

//   // Course chips
//   const handleCourseSelect = (course) => {
//     setFormData((prev) => ({
//       ...prev,
//       course,
//     }));
//   };

//   // File upload handlers
//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData((prev) => ({
//         ...prev,
//         photoFile: file,
//         photoUrl: URL.createObjectURL(file),
//       }));
//     }
//   };

//   const handleResumeChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData((prev) => ({
//         ...prev,
//         resumeFile: file,
//         resumeUrl: file.name,
//       }));
//     }
//   };

//   // Form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       if (key === "languages") {
//         value.forEach((lang) => data.append("languages[]", lang));
//       } else if (key === "photoFile" && value) {
//         data.append("photo", value);
//       } else if (key === "resumeFile" && value) {
//         data.append("resume", value);
//       } else if (key !== "photoUrl" && key !== "resumeUrl") {
//         data.append(key, value);
//       }
//     });

//     // Replace with your API endpoint
//     await fetch("/api/student-profile", {
//       method: "POST",
//       body: data,
//     });
//     alert("Profile submitted!");
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-8"
//     >
//       {/* Profile Picture */}
//       <div className="flex flex-col items-center gap-2">
//         <div className="relative">
//           <img
//             src={formData.photoUrl}
//             alt="Profile"
//             className="w-24 h-24 rounded-full object-cover border-2 border-blue-300"
//           />
//           <span
//             type="button"
//             onClick={() => photoInputRef.current.click()}
//             className="absolute bottom-0 right-0 bg-blue-100 text-blue-700 rounded-full p-2 shadow hover:bg-blue-200 cursor-pointer"
//             title="Upload photo "
//           >
//             <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
//               <path
//                 d="M12 16v-8m0 0l-3 3m3-3l3 3M21 16.5V19a2 2 0 01-2 2H5a2 2 0 01-2-2v-2.5"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </span>
//           <input
//             ref={photoInputRef}
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={handlePhotoChange}
//           />
//         </div>
//         <span className="text-xs text-gray-500">Profile picture</span>
//       </div>
//       {/* Name, Email, Contact, City */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             First name
//           </label>
//           <input
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Last name <span className="text-gray-400">(Optional)</span>
//           </label>
//           <input
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//           />
//         </div>
//         <div className="md:col-span-2">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Email
//           </label>
//           <input
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-500"
//             required
//             disabled
//             placeholder="your@email.com"
//           />
//         </div>
//         <div className="flex">
//           <span className="flex items-center px-3 border rounded-l-lg bg-gray-50 text-gray-500">
//             +91
//           </span>
//           <input
//             name="contactNumber"
//             type="tel"
//             value={formData.contactNumber}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border-t border-b border-r rounded-r-lg focus:ring-2 focus:ring-blue-400"
//             placeholder="9537303549"
//             required
//           />
//         </div>
//         <div className="md:col-span-2">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Current city
//             <span className="block text-xs text-gray-400">
//               To connect you with opportunities closer to you
//             </span>
//           </label>
//           <input
//             name="currentCity"
//             value={formData.currentCity}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//             placeholder=""
//             required
//           />
//         </div>
//       </div>
//       {/* Gender */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Gender
//         </label>
//         <div className="flex gap-6">
//           {genderOptions.map((g) => (
//             <label
//               key={g.value}
//               className="flex items-center gap-2 cursor-pointer"
//             >
//               <input
//                 type="radio"
//                 name="gender"
//                 value={g.value}
//                 checked={formData.gender === g.value}
//                 onChange={() => handleGenderSelect(g.value)}
//                 className="accent-blue-600"
//               />
//               <span className="text-base">
//                 {g.icon} {g.label}
//               </span>
//             </label>
//           ))}
//         </div>
//       </div>
//       {/* Languages */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Languages you know
//         </label>
//         <div className="flex flex-wrap items-center gap-2 mb-2">
//           {formData.languages.map((lang) => (
//             <span
//               key={lang}
//               className="inline-flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-1"
//             >
//               {lang}
//               <span
//                 onClick={() =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     languages: prev.languages.filter((l) => l !== lang),
//                   }))
//                 }
//                 className=" ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
//               >
//                 ×
//               </span>
//             </span>
//           ))}
//         </div>
//         <div className=" flex items-center content-center gap-2">
//           <input
//             type="text"
//             value={customLanguage}
//             onChange={(e) => setCustomLanguage(e.target.value)}
//             placeholder="Add language"
//             className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 e.preventDefault();
//                 handleAddCustomLanguage();
//               }
//             }}
//           />
//           <button
//             type="button"
//             onClick={handleAddCustomLanguage}
//             className=" text-xs  bg-blue-500 text-white rounded-lg "
//           >
//             Add
//           </button>
//         </div>
//       </div>
//       {/* Course */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Course
//         </label>
//         <div className="flex flex-wrap gap-4 mb-2">
//           {courseOptions.map((course) => (
//             <label
//               key={course}
//               className="flex items-center gap-2 cursor-pointer px-3 py-1 rounded-full border text-sm transition
//             bg-white text-blue-700 border-blue-300"
//             >
//               <input
//                 type="radio"
//                 name="course"
//                 value={course}
//                 checked={formData.course === course}
//                 onChange={() => handleCourseSelect(course)}
//                 className="accent-blue-600"
//               />
//               <span>{course}</span>
//             </label>
//           ))}
//         </div>
//       </div>
//       {/* College, Stream, Years */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           College name
//         </label>
//         <input
//           name="college"
//           value={formData.college}
//           onChange={handleChange}
//           className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//           placeholder="Shantilal Shah Engineering College"
//           required
//         />
//         <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">
//           Stream <span className="text-gray-400">(Optional)</span>
//         </label>
//         <input
//           name="stream"
//           value={formData.stream}
//           onChange={handleChange}
//           className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//           placeholder="Eg. Computer Science"
//         />
//         <div className="grid grid-cols-2 gap-4 mt-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Start year
//             </label>
//             <select
//               name="startYear"
//               value={formData.startYear}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//               required
//             >
//               <option value="">Choose year</option>
//               {yearOptions.map((y) => (
//                 <option key={y.value} value={y.value}>
//                   {y.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               End year
//             </label>
//             <select
//               name="endYear"
//               value={formData.endYear}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//               required
//             >
//               <option value="">Choose year</option>
//               {yearOptions.map((y) => (
//                 <option key={y.value} value={y.value}>
//                   {y.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>
//       {/* Resume Upload */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Resume
//         </label>
//         <div className="flex items-center gap-4">
//           <button
//             type="button"
//             onClick={() => resumeInputRef.current.click()}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Upload Resume
//           </button>
//           <input
//             ref={resumeInputRef}
//             type="file"
//             accept=".pdf,.doc,.docx"
//             className="hidden"
//             onChange={handleResumeChange}
//           />
//           {formData.resumeUrl && (
//             <span className="text-sm text-gray-600">{formData.resumeUrl}</span>
//           )}
//         </div>
//       </div>
//       {/* Submit */}
//       <div className="flex justify-end">
//         <button
//           type="submit"
//           className="px-8 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600"
//         >
//           Next
//         </button>
//       </div>
//     </form>
//   );
// };

// export default StudentProfile;

import React, { useState } from "react";

const StudentProfileForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    photoUrl: "",
    contactNumber: "",
    currentCity: "",
    gender: "",
    languages: [],
    resumeUrl: "",
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

  const [tempInputs, setTempInputs] = useState({
    language: "",
    skill: "",
    activity: "",
    training: "",
    accomplishment: "",
  });

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

  const addArrayItem = (field, value) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], value.trim()],
      }));
      setTempInputs((prev) => ({
        ...prev,
        [field === "languages"
          ? "language"
          : field === "skills"
          ? "skill"
          : field === "extraCurricularActivities"
          ? "activity"
          : field === "trainingsCourses"
          ? "training"
          : "accomplishment"]: "",
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
    try {
      // Replace with your API endpoint
      const response = await fetch("/api/student-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add authorization header if needed
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Profile saved successfully!");
      } else {
        alert("Error saving profile");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving profile");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Student Profile
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Personal Information
          </h2>
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
                Photo URL
              </label>
              <input
                type="url"
                name="photoUrl"
                value={formData.photoUrl}
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
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>
        </section>

        {/* Resume and Career Objective */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Professional Summary
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Resume URL
              </label>
              <input
                type="url"
                name="resumeUrl"
                value={formData.resumeUrl}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Career Objective
              </label>
              <textarea
                name="careerObjective"
                value={formData.careerObjective}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>

        {/* Languages */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Languages
          </h2>
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                name="language"
                value={tempInputs.language}
                onChange={handleTempInputChange}
                placeholder="Add a language"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => addArrayItem("languages", tempInputs.language)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
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
                  <button
                    type="button"
                    onClick={() => removeArrayItem("languages", index)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Skills</h2>
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                name="skill"
                value={tempInputs.skill}
                onChange={handleTempInputChange}
                placeholder="Add a skill"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => addArrayItem("skills", tempInputs.skill)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
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
                  <button
                    type="button"
                    onClick={() => removeArrayItem("skills", index)}
                    className="ml-2 text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">Education</h2>
            <button
              type="button"
              onClick={() => addNestedItem("education")}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Add Education
            </button>
          </div>
          {formData.education.map((edu, index) => (
            <div
              key={index}
              className="border border-gray-200 p-4 rounded-lg mb-4"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-gray-600">
                  Education {index + 1}
                </h3>
                {formData.education.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeNestedItem("education", index)}
                    className="text-red-500 hover:text-red-700"
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
                    placeholder="Start Date"
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
                    placeholder="End Date"
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
            <h2 className="text-2xl font-semibold text-gray-700">
              Work Experience
            </h2>
            <button
              type="button"
              onClick={() => addNestedItem("workExperience")}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Add Experience
            </button>
          </div>
          {formData.workExperience.map((exp, index) => (
            <div
              key={index}
              className="border border-gray-200 p-4 rounded-lg mb-4"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-gray-600">
                  Experience {index + 1}
                </h3>
                {formData.workExperience.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeNestedItem("workExperience", index)}
                    className="text-red-500 hover:text-red-700"
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
                    placeholder="Start Date"
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
                    placeholder="End Date"
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
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Extra Curricular Activities
          </h2>
          <div className="space-y-2">
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
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <div className="space-y-1">
              {formData.extraCurricularActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 bg-white rounded border"
                >
                  <span>{activity}</span>
                  <button
                    type="button"
                    onClick={() =>
                      removeArrayItem("extraCurricularActivities", index)
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trainings and Courses */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Trainings & Courses
          </h2>
          <div className="space-y-2">
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
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <div className="space-y-1">
              {formData.trainingsCourses.map((training, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 bg-white rounded border"
                >
                  <span>{training}</span>
                  <button
                    type="button"
                    onClick={() => removeArrayItem("trainingsCourses", index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Academic Personal Projects */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">
              Academic & Personal Projects
            </h2>
            <button
              type="button"
              onClick={() => addNestedItem("academicPersonalProjects")}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Add Project
            </button>
          </div>
          {formData.academicPersonalProjects.map((project, index) => (
            <div
              key={index}
              className="border border-gray-200 p-4 rounded-lg mb-4"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-gray-600">
                  Project {index + 1}
                </h3>
                {formData.academicPersonalProjects.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      removeNestedItem("academicPersonalProjects", index)
                    }
                    className="text-red-500 hover:text-red-700"
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

        {/* Portfolio Work Samples */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">
              Portfolio & Work Samples
            </h2>
            <button
              type="button"
              onClick={() => addNestedItem("portfolioWorkSamples")}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Add Sample
            </button>
          </div>
          {formData.portfolioWorkSamples.map((sample, index) => (
            <div
              key={index}
              className="border border-gray-200 p-4 rounded-lg mb-4"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-gray-600">
                  Sample {index + 1}
                </h3>
                {formData.portfolioWorkSamples.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      removeNestedItem("portfolioWorkSamples", index)
                    }
                    className="text-red-500 hover:text-red-700"
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

        {/* Accomplishments */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Accomplishments & Additional Details
          </h2>
          <div className="space-y-2">
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
                type="button"
                onClick={() =>
                  addArrayItem(
                    "accomplishmentsAdditionalDetails",
                    tempInputs.accomplishment
                  )
                }
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <div className="space-y-1">
              {formData.accomplishmentsAdditionalDetails.map(
                (accomplishment, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 bg-white rounded border"
                  >
                    <span>{accomplishment}</span>
                    <button
                      type="button"
                      onClick={() =>
                        removeArrayItem(
                          "accomplishmentsAdditionalDetails",
                          index
                        )
                      }
                      className="text-red-500 hover:text-red-700"
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
            type="submit"
            className="px-4 py-1 bg-blue-600 text-white text-base font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentProfileForm;
