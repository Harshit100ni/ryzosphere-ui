import React, { useState } from "react";
import axiosConfig from "../../lib/axiosConfig";
import API_ENDPOINTS from "../../lib/endpoints";
import { useMutation } from "react-query";
import AutoComplete from "../../components/AutoComplete";
import { AlertCircle, Loader2, MapPin, Users } from "lucide-react";

const fetchFamilyOffices = async (familyOfficeName: string): Promise<any> => {
  try {
    const response = await axiosConfig.get(
      API_ENDPOINTS.FO_MATCHED_WITH_COUNTRY_INTEREST,
      { params: { familyOfficeName } }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error);
    throw new Error(error?.response?.data?.message || "Something went wrong!");
  }
};

const FOMatchedWithCountryAndInter: React.FC = () => {
  const [familyOffice, setFamilyOffice] = useState<string>("");

  const { mutate, data, reset, isLoading, error } =
    useMutation(fetchFamilyOffices);

  const handleSelect = (selectedName: string) => {
    setFamilyOffice(selectedName);
    mutate(selectedName);
  };

  return (
    <div className="container p-6 max-w-2xl mx-auto">
      <div className="relative p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
          Family Offices Matching Interests & Country
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          Enter a <strong>Family Office</strong> name to find **other Family
          Offices** that share common interests 🌍 in the same country.
        </p>

        {/* AutoComplete Search Input */}
        <AutoComplete
          placeholder="Enter Family Office name"
          onSelect={handleSelect}
          handleOnClear={reset}
        />

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
            <p>{"Failed to fetch data. Please try again!"}</p>
          </div>
        )}

        {/* Data Output */}
        {data && data.success && (
          <div className="mt-6">
            {data.data.length === 0 ? (
              <p className="text-gray-500 text-center">
                No matching **Family Offices** found for{" "}
                <strong>{familyOffice}</strong> in the same country with common
                interests.
              </p>
            ) : (
              data.data.map((item: any, index: number) => (
                <div
                  key={index}
                  className="p-6 mt-4 bg-white shadow-md rounded-2xl border border-gray-200"
                >
                  {/* Family Office Name */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-1 flex items-center gap-2">
                    <Users size={20} /> {item?.familyOffice || "N/A"}
                  </h3>

                  {/* Country */}
                  <p className="text-gray-600 text-sm flex items-center gap-2">
                    <MapPin size={16} className="text-blue-500" />
                    Country:{" "}
                    <span className="font-semibold">
                      {item?.country || "Unknown"}
                    </span>
                  </p>

                  {/* Common Interests */}
                  <div className="mt-3">
                    <p className="text-lg font-medium text-gray-700">
                      🌟 Common Interests:
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item?.commonInterests?.length > 0 ? (
                        item.commonInterests.map(
                          (interest: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-full"
                            >
                              {interest}
                            </span>
                          )
                        )
                      ) : (
                        <p className="text-gray-500">No interests found</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FOMatchedWithCountryAndInter;
