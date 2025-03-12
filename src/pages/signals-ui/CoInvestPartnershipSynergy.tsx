import React, { useState } from "react";
import axiosConfig from "../../lib/axiosConfig";
import API_ENDPOINTS from "../../lib/endpoints";
import { useMutation } from "react-query";
import AutoComplete from "../../components/AutoComplete";

const fetchCoInvestSynergy = async (entityName: string): Promise<any> => {
  const response = await axiosConfig.get(
    API_ENDPOINTS.CO_INVESTOR_PARTNERSHIP_SYNERGY,
    {
      params: {
        entityName,
      },
    }
  );
  return response.data;
};

const CoInvestPartnershipSynergy: React.FC = () => {
  const [entityName, setEntityName] = useState<string>("Silver Oak Capital");
  const { mutate, data, reset, isLoading, error } =
    useMutation(fetchCoInvestSynergy);

  const handleSelect = (selectedName: string) => {
    setEntityName(selectedName);
    mutate(selectedName);
  };

  return (
    <div className="container max-w-2xl p-4">
      <div className="p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">
          Co-Investor & Partnership Synergy
        </h1>

        {/* Information message */}
        <p className="text-gray-600 mb-4">
          Enter a valid Family Office, Advisor Professional, Organization, or
          Service Provider name to find their co-investors.
        </p>

        {/* Input field for Family Office name */}
        <AutoComplete
          placeholder="Enter entity name"
          onSelect={handleSelect}
          handleOnClear={reset}
        />

        {/* Show loading state */}
        {isLoading && <p className="text-gray-500">Fetching data...</p>}

        {/* Show error message */}
        {error && <p className="text-red-500">{(error as Error).message}</p>}

        {/* Display Co-Investor Synergy results */}
        {data && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            {data?.data?.map((item: any, index: number) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Co-Investment Synergy
                </h3>

                <p className="text-gray-700">{item.recommendation}</p>

                {/* Partners and their Types */}
                <div className="mt-4">
                  <p className="font-medium text-gray-800">Shared Partners:</p>
                  <ul className="text-gray-700">
                    {item.sharedPartners.map((partner: any, index: number) => (
                      <li key={index} className="mb-2">
                        <span className="font-semibold">{partner.partner}</span>{" "}
                        ({partner.partnerType})
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Shared Investment Vehicles */}
                <div className="mt-4">
                  <p className="font-medium text-gray-800">
                    Shared Investment Vehicles:
                  </p>
                  <ul className="text-gray-700">
                    <li>{item.sharedVehicles}</li>
                  </ul>
                </div>

                {/* Risk Levels */}
                <div className="mt-4">
                  <p className="font-medium text-gray-800">Risk Levels:</p>
                  <ul className="text-gray-700">
                    <li>
                      High Risk Overlap: {item.riskLevels.highRiskOverlap}
                    </li>
                    <li>
                      Medium Risk Overlap: {item.riskLevels.mediumRiskOverlap}
                    </li>
                    <li>Low Risk Overlap: {item.riskLevels.lowRiskOverlap}</li>
                  </ul>
                </div>

                {/* Shared Jurisdictions */}
                <div className="mt-4">
                  <p className="font-medium text-gray-800">
                    Shared Jurisdictions:
                  </p>
                  <p className="text-gray-700">{item.sharedJurisdictions}</p>
                </div>

                {/* Average Return */}
                <div className="mt-4">
                  <p className="font-medium text-gray-800">Average Return:</p>
                  <p className="text-gray-700">{item.avgReturn ?? "N/A"}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* If no data or failure */}
        {!isLoading && data && data?.success && data?.data?.length === 0 && (
          <p className="text-gray-500">
            No co-investor synergy found for this Family Office.
          </p>
        )}
      </div>
    </div>
  );
};

export default CoInvestPartnershipSynergy;
