import React, { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";
import axiosInstance from "../axios/axiosInstance";
import { Link } from "react-router-dom";

const CompanyList = () => {
  const [featuredCompanies, setFeaturedCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedCompanies = async () => {
      try {
        const res = await axiosInstance.get("/api/user/company/all");
        if (res.status === 200) {
          // Show only first 4 companies for home page
          setFeaturedCompanies(res.data.slice(0, 4));
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCompanies();
  }, []);

  const LoadingSkeleton = () => (
    <div className="bg-white rounded-xl shadow-lg animate-pulse overflow-hidden">
      <div className="bg-gradient-to-r from-gray-300 to-gray-400 h-20"></div>
      <div className="p-6 space-y-4">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 rounded w-full"></div>
        <div className="h-8 bg-gray-300 rounded"></div>
      </div>
    </div>
  );

  return (
    <>
      {/* Featured Companies Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Companies
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover some of the amazing companies that are part of our
            community
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <LoadingSkeleton key={index} />
            ))}
          </div>
        ) : featuredCompanies.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCompanies.map((company) => (
                <CompanyCard key={company._id} companyData={company} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏢</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No Companies Yet
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Companies will appear here once they register on the platform
            </p>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {featuredCompanies.length}+
              </div>
              <div className="text-gray-600 font-medium">
                Registered Companies
              </div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600 font-medium">Job Opportunities</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                1000+
              </div>
              <div className="text-gray-600 font-medium">Active Students</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyList;
