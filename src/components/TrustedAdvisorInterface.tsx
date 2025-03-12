"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

export default function TrustedAdvisorInterface() {
  const [searchQuery, setSearchQuery] = useState("Deloitte");

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4  ">
      {/* Left Panel - Search */}
      <div className="w-full md:w-2/5 border border-gray-200 rounded-lg p-6 shadow-sm">
        {/* <h2 className="text-xl font-medium text-primary mb-4">
          Trusted Advisor & Vendor Score Signal
        </h2>
        <p className="text-gray-600 mb-4">
          Enter a Service Provider or Advisor Professional name to check their
          trust score and details.
        </p> */}

        {/* <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Search for advisor or vendor"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          )}
        </div> */}
        <div className=" space-y-2">
          <div className="bg-primary-light p-4 rounded-md cursor-pointer">
            <h3 className="text-primary font-medium">
              Trusted Advisor & Vendor Score Signal
            </h3>
          </div>
          <div className="bg-primary-light p-4 rounded-md cursor-pointer">
            <h3 className="text-primary font-medium">
              Co-Investor & Partnership Synergy
            </h3>
          </div>
          <div className="bg-primary-light p-4 rounded-md cursor-pointer">
            <h3 className="text-primary font-medium">
              Collaborative Network Strength
            </h3>
          </div>
          <div className="bg-primary-light p-4 rounded-md cursor-pointer">
            <h3 className="text-primary font-medium">
              Non-Obvious Connections
            </h3>
          </div>
          <div className="bg-primary-light p-4 rounded-md cursor-pointer">
            <h3 className="text-primary font-medium">Conflict of Interest</h3>
          </div>
        </div>
      </div>

      {/* Right Panel - Results */}
      <div className="w-full md:w-3/5">
        {searchQuery === "Deloitte" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-medium text-primary">Deloitte</h2>
            <div className="border-t border-gray-200 my-4"></div>

            {/* Information Grid */}
            <div className="grid grid-cols-2 gap-y-4">
              <div className="text-gray-600">Type</div>
              <div className="font-medium">Service Provider</div>

              <div className="text-gray-600">Total Clients</div>
              <div className="font-medium">2</div>

              <div className="text-gray-600">Average Rating</div>
              <div className="font-medium">4.60</div>

              <div className="text-gray-600">Total Reviews</div>
              <div className="font-medium">30</div>

              <div className="text-gray-600">Trust Level</div>
              <div className="font-medium">High-Trust Vendor</div>

              <div className="text-gray-600">Clients</div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  Silver Oak
                </span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  CapitalGreen
                </span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  Fields Group
                </span>
              </div>
            </div>

            {/* Category Sections */}
          </div>
        )}
      </div>
    </div>
  );
}
