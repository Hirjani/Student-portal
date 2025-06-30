import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import CompanyCard from "./CompanyCard";
import axiosInstance from "../axios/axiosInstance";
import { errorToast } from "../lib/toast";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchCompanies = async () => {
      setLoading(true);
      try {
        if (searchQuery.trim()) {
          // Use the search API endpoint
          const res = await axiosInstance.get(
            `/api/user/company/search?q=${encodeURIComponent(searchQuery)}`
          );
          if (res.status === 200) {
            setCompanies(res.data);
          } else {
            errorToast("Error searching companies");
            setCompanies([]);
          }
        } else {
          // If no search query, fetch all companies
          const res = await axiosInstance.get("/api/user/company/all");
          if (res.status === 200) {
            setCompanies(res.data);
          } else {
            errorToast("Error loading companies");
            setCompanies([]);
          }
        }
      } catch (error) {
        console.error("Error searching companies:", error);
        errorToast("Error searching companies");
        setCompanies([]);
      } finally {
        setLoading(false);
      }
    };

    searchCompanies();
  }, [searchQuery]);

  const LoadingSkeleton = () => (
    <div className="bg-white rounded-xl shadow-lg animate-pulse overflow-hidden">
      <div className="bg-gradient-to-r from-gray-300 to-gray-400 h-20"></div>
      <div className="p-6 space-y-4">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 rounded w-full"></div>
        <div className="h-3 bg-gray-300 rounded w-2/3"></div>
        <div className="h-8 bg-gray-300 rounded"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        {searchQuery && (
          <div className="mb-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Search Results
              </h1>
              {searchQuery && (
                <p className="text-lg text-gray-600">
                  Results for "
                  <span className="font-semibold text-blue-600">
                    {searchQuery}
                  </span>
                  "
                </p>
              )}
            </div>
          </div>
        )}

        {/* Search Stats */}
        {!loading && searchQuery && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-4">
                <div>
                  <span className="text-3xl font-bold text-blue-600">
                    {companies.length}
                  </span>
                  <span className="text-gray-600 ml-2 text-lg">
                    {companies.length === 1 ? "Company" : "Companies"} Found
                  </span>
                </div>
                {searchQuery && (
                  <div className="hidden md:block text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    Searched in names
                  </div>
                )}
              </div>
              {/* <Link
                to="/companies"
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center transition-colors duration-200"
              >
                Browse All Companies →
              </Link> */}
            </div>
          </div>
        )}
        {!searchQuery && (
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Explore Companies
            </h2>
            <p className="text-gray-600">
              Browse through all registered companies to find your next
              opportunity.
            </p>
          </div>
        )}
        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <LoadingSkeleton key={index} />
            ))}
          </div>
        )}

        {/* No Results Found */}
        {!loading && companies.length === 0 && searchQuery && (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🔍</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              No Results Found
            </h3>
            <p className="text-gray-600 max-w-lg mx-auto mb-8 text-lg leading-relaxed">
              We couldn't find any companies matching "
              <strong className="text-gray-800">{searchQuery}</strong>". Try
              using different keywords or browse all companies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/search"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Try New Search
              </Link>
              <Link
                to="/companies"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Browse All Companies
              </Link>
            </div>
          </div>
        )}

        {/* Empty Search Query */}
        {!loading && !searchQuery && companies.length === 0 && (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🏢</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              No Companies Yet
            </h3>
            <p className="text-gray-600 max-w-lg mx-auto mb-8 text-lg leading-relaxed">
              No companies have registered on the platform yet. Check back later
              to discover amazing opportunities!
            </p>
            <Link
              to="/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Back to Home
            </Link>
          </div>
        )}

        {/* Search Results Grid using CompanyCard */}
        {!loading && companies.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {companies.map((company) => (
                <CompanyCard key={company._id} companyData={company} />
              ))}
            </div>

            {/* Results Info */}
            {companies.length > 12 && (
              <div className="text-center mt-12">
                <div className="text-gray-600 mb-4">
                  Showing {companies.length} companies{" "}
                  {searchQuery && `for "${searchQuery}"`}
                </div>
                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200"
                >
                  ↑ Back to Top
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
