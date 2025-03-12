import React, { useState } from "react";
import axiosConfig from "../../lib/axiosConfig";
import API_ENDPOINTS from "../../lib/endpoints";
import { useMutation } from "react-query";
import AutoComplete from "../../components/AutoComplete";

const fetchTrustedAdvisorScore = async (entityName: string): Promise<any> => {
  const response = await axiosConfig.get(API_ENDPOINTS.TRUSTED_ADVISOR_SCORE, {
    params: { vendorName: entityName },
  });
  return response.data;
};

const TrustedAdvisorScore: React.FC = () => {
  const [entityName, setEntityName] = useState<string>("");

  const { mutate, data, reset, isLoading, error } = useMutation(
    fetchTrustedAdvisorScore
  );

  const handleSelect = (selectedName: string) => {
    setEntityName(selectedName);
    mutate(selectedName);
  };

  return (
    <div className="container p-6 max-w-2xl">
      <div className="relative p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">
          Trusted Advisor & Vendor Score Signal
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          Enter a Service Provider or Advisor Professional name to check their
          trust score and details.
        </p>

        <AutoComplete
          placeholder="Enter entity name"
          onSelect={handleSelect}
          handleOnClear={reset}
        />

        {/* Loader */}
        {isLoading && (
          <p className="text-gray-500 text-center">Fetching data...</p>
        )}

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-center">Failed to fetch data.</p>
        )}

        {/* Data Output */}
        {data && data.success && (
          <div className="mt-6">
            {data.data.length === 0 ? (
              <p className="text-gray-500 text-center">
                No records found for <strong>{entityName}</strong>. Please check
                the name and try again. Use valid{" "}
                <strong>Service Provider or Advisor Professional name</strong>
              </p>
            ) : (
              data.data.map((item: any, index: number) => (
                <div
                  key={index}
                  className="p-6 mt-4 bg-white shadow-lg rounded-2xl border border-gray-200"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {item.entityName}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Type: {item.entityType}
                  </p>

                  {/* Clients & Ratings */}
                  <div className="mt-3 space-y-2">
                    <p className="text-lg font-medium text-gray-700">
                      Total Clients:{" "}
                      <span className="font-bold">{item.totalClients}</span>
                    </p>
                    <p className="text-lg font-medium text-gray-700">
                      Average Rating:{" "}
                      <span className="font-bold">
                        {item?.avgRating ? item?.avgRating?.toFixed(2) : " - -"}
                      </span>
                    </p>
                    <p className="text-lg font-medium text-gray-700">
                      Total Reviews:{" "}
                      <span className="font-bold">{item.totalReviews}</span>
                    </p>
                  </div>

                  {/* Client Names */}
                  <div className="mt-3">
                    <p className="text-lg font-medium text-gray-700">
                      Clients:
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.clientNames.map((client: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-full"
                        >
                          {client}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Trust Level */}
                  <p className="text-lg font-semibold text-blue-600 mt-4">
                    Trust Level: {item.trustLabel}
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

export default TrustedAdvisorScore;
