import React from "react";
import { useNavigate } from "react-router-dom";

const CompanyCard = ({ companyData }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/company/details?id=${companyData._id}`);
  };

  // Helper function to get company size range
  const getCompanySize = (employees) => {
    if (!employees) return null;
    if (employees <= 10) return "1-10";
    if (employees <= 50) return "11-50";
    if (employees <= 200) return "51-200";
    if (employees <= 500) return "201-500";
    if (employees <= 1000) return "501-1000";
    if (employees <= 5000) return "1001-5000";
    return "5000+";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden max-w-sm">
      {/* Header with Logo and Basic Info */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
        <div className="flex items-center space-x-4">
          {/* Company Logo */}
          <div className="flex-shrink-0">
            {companyData.companyLogoUrl ? (
              <img
                src={companyData.companyLogoUrl}
                alt={`${companyData.companyName} Logo`}
                className="w-12 h-12 object-contain bg-white rounded-lg p-2"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <div
              className={`w-12 h-12 bg-white rounded-lg flex items-center justify-center ${
                companyData.companyLogoUrl ? "hidden" : "flex"
              }`}
            >
              <span className="text-xl">🏢</span>
            </div>
          </div>

          {/* Company Name */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-lg truncate">
              {companyData.companyName || "Company Name"}
            </h3>
            {companyData.headquarters && (
              <p className="text-blue-100 text-sm flex items-center mt-1">
                <span className="mr-1">📍</span>
                <span className="truncate">{companyData.headquarters}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Description */}
        {companyData.companyDescription && (
          <div className="mb-4">
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
              {companyData.companyDescription.length > 120
                ? `${companyData.companyDescription.substring(0, 120)}...`
                : companyData.companyDescription}
            </p>
          </div>
        )}

        {/* Quick Info */}
        <div className="space-y-2 mb-4">
          {companyData.industry && (
            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-2">🏭</span>
              <span className="truncate">{companyData.industry}</span>
            </div>
          )}

          {companyData.numberOfEmployees && (
            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-2">👥</span>
              <span>
                {getCompanySize(companyData.numberOfEmployees)} employees
              </span>
            </div>
          )}

          {companyData.companyWebsite && (
            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-2">🌐</span>
              <a
                href={companyData.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 truncate"
                onClick={(e) => e.stopPropagation()}
              >
                {companyData.companyWebsite.replace(/^https?:\/\//, "")}
              </a>
            </div>
          )}

          {companyData.createdAt && (
            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-2">📅</span>
              <span>
                Joined{" "}
                {new Date(companyData.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={handleViewProfile}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
        >
          View Company Profile
        </button>
      </div>
    </div>
  );
};

export default CompanyCard;
