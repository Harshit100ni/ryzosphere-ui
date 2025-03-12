import React, { useState } from "react";
import axiosConfig from "../../lib/axiosConfig";
import API_ENDPOINTS from "../../lib/endpoints";
import { useMutation } from "react-query";
import {
  AlertCircle,
  Loader2,
  Building,
  PhoneCall,
  FileText,
} from "lucide-react";

const SEGMENTS = [
  "Software & Technology",
  "Accounting",
  "Commercial Multi Family Office",
  "Data",
  "Financial Services",
  "Financial services - Alternative Investments",
  "Financial services - Asset Management",
  "Financial services - Banking",
  "Financial services - Insurance",
  "Financial services - PE VC",
  "Financial services - Wealth Management",
  "Legal",
  "Lifestyle Services",
  "Other",
  "Travel & Hospitality",
];

const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Denmark",
  "Switzerland",
  "Slovenia",
  "France",
  "Australia",
  "Monaco",
];

const fetchServiceProviders = async ({ segment, country }: any) => {
  try {
    const response = await axiosConfig.get(
      API_ENDPOINTS.TOP_SERVICE_PROVIDERS,
      {
        params: { segment, country },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Something went wrong! Please try again.");
  }
};

const TopServiceProvidersFinder = () => {
  const [segment, setSegment] = useState("");
  const [country, setCountry] = useState("");

  const { mutate, data, reset, isLoading, error } = useMutation(
    fetchServiceProviders
  );

  const handleSearch = () => {
    if (segment && country) {
      mutate({ segment, country });
    }
  };

  const handleClear = () => {
    setSegment("");
    setCountry("");
    reset();
  };

  return (
    <div className="container p-6 max-w-2xl mx-auto">
      <div className="relative p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">
          🔎 Top 3 Service Providers Finder
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          Select a Segment and Country to find the top 3 service providers with
          the highest trust score.
        </p>

        {/* Dropdowns */}
        <div className="space-y-4">
          <select
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={segment}
            onChange={(e) => setSegment(e.target.value)}
          >
            <option value="">Select Segment</option>
            {SEGMENTS.map((seg) => (
              <option key={seg} value={seg}>
                {seg}
              </option>
            ))}
          </select>

          <select
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">Select Country</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Buttons */}
          <button
            className={`w-full py-2 px-4 rounded-lg transition ${
              !segment || !country
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            onClick={handleSearch}
            disabled={!segment || !country || isLoading}
          >
            {isLoading ? "Fetching..." : "Find Top Service Providers"}
          </button>

          <button
            className="w-full mt-2 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center mt-4">
            <Loader2 className="animate-spin text-gray-500" size={24} />
            <p className="ml-2 text-gray-500">Fetching data...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mt-4 flex items-center text-red-600">
            <AlertCircle size={20} className="mr-2" />
            <p>Failed to fetch data. Please try again!</p>
          </div>
        )}

        {/* Data Output */}
        {data && data.success && (
          <div className="mt-6">
            {data.data.length === 0 ? (
              <p className="text-gray-500 text-center">
                No matching Service Providers found.
              </p>
            ) : (
              data.data.map((item: any, index: number) => (
                <div
                  key={index}
                  className="p-6 mt-4 bg-white shadow-md rounded-2xl border border-gray-200"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-1 flex items-center gap-2">
                    <Building size={20} /> {item?.serviceProvider || "N/A"}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    🌍 Country: {item?.country || "Unknown"}
                  </p>
                  <p className="text-gray-600 text-sm">
                    📌 Segment: {item?.segment || "Unknown"}
                  </p>
                  <p className="text-lg font-medium text-gray-700 mt-2">
                    ⭐ Trust Score: {item?.trustScore}
                  </p>
                  <p className="text-gray-600 flex items-center gap-2">
                    <PhoneCall size={16} className="text-blue-500" /> Phone
                    Calls: {item?.phoneCalls}
                  </p>
                  <p className="text-gray-600 flex items-center gap-2">
                    <PhoneCall size={16} className="text-blue-500" />
                    Deals: {item?.leads}
                  </p>
                  <p className="text-gray-600 flex items-center gap-2">
                    <FileText size={16} className="text-green-500" /> Forms
                    Submitted: {item?.formsSubmitted}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopServiceProvidersFinder;
