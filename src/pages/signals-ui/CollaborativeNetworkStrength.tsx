import React, { useState } from "react";
import axiosConfig from "../../lib/axiosConfig";
import API_ENDPOINTS from "../../lib/endpoints";
import { useMutation } from "react-query";
import AutoComplete from "../../components/AutoComplete";

const fetchNetworkStrength = async (entityName: string): Promise<any> => {
  const response = await axiosConfig.get(
    API_ENDPOINTS.COLLABORATIVE_NETWORK_STRENGTH,
    {
      params: { entityName },
    }
  );
  return response.data;
};

const CollaborativeNetworkStrength: React.FC = () => {
  const [entityName, setEntityName] = useState<string>("");

  const { mutate, data, reset, isLoading, error } =
    useMutation(fetchNetworkStrength);

  const handleSelect = (selectedName: string) => {
    setEntityName(selectedName);
    mutate(selectedName);
  };

  const renderList = (items: any[], label: string) => {
    if (items.length === 0) {
      return <p className="text-gray-700">N/A</p>;
    }
    return (
      <ul className="list-disc pl-5">
        {items.map((item: any, idx: number) => (
          <li key={idx} className="text-gray-700">
            {item.name}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="container max-w-2xl p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg mb-4  mx-auto">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Collaborative Network Strength
        </h1>
        <p className="text-gray-600 text-sm mb-4">
          Enter Family Office, Service Provider, or Advisor name to check their
          network strength.
        </p>
        <div className="mb-4">
          <AutoComplete
            placeholder="Enter entity name"
            onSelect={handleSelect}
            handleOnClear={reset}
          />
        </div>

        {isLoading && (
          <p className="text-gray-500 text-center">Fetching data...</p>
        )}

        {/* Show error message */}
        {error && (
          <p className="text-red-500 text-center">{(error as Error).message}</p>
        )}

        {/* Display network strength data */}
        {data && data.success && data.data.length > 0 && (
          <div className="mt-6">
            {data.data.map((item: any, index: number) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg mb-4 max-w-2xl mx-auto"
              >
                <h3 className="text-2xl font-semibold mb-2">{item.entity}</h3>
                <p className="text-xl font-medium">
                  Network Strength: {item.networkStrength || "N/A"}
                </p>
                <p className="text-lg">{item.comparativeRanking || "N/A"}</p>

                {/* Displaying top connected advisors, service providers, investments */}
                <div className="mt-4">
                  <h4 className="font-semibold text-lg">
                    Top Connected Advisors:
                  </h4>
                  {renderList(
                    item.topConnectedAdvisors,
                    "Top Connected Advisors"
                  )}
                </div>

                <div className="mt-4">
                  <h4 className="font-semibold text-lg">
                    Top Service Providers:
                  </h4>
                  {renderList(
                    item.topServiceProviders,
                    "Top Service Providers"
                  )}
                </div>

                <div className="mt-4">
                  <h4 className="font-semibold text-lg">Top Investments:</h4>
                  {renderList(item.topInvestments, "Top Investments")}
                </div>

                {/* Display philanthropic connections and co-investors if any */}
                {item.philanthropicConnections &&
                  item.philanthropicConnections.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-lg">
                        Philanthropic Connections:
                      </h4>
                      <ul className="list-disc pl-5">
                        {item.philanthropicConnections.map(
                          (philanthropy: any, idx: number) => (
                            <li key={idx} className="text-gray-700">
                              {philanthropy.name}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                {item.coInvestors && item.coInvestors.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-lg">Co-Investors:</h4>
                    <ul className="list-disc pl-5">
                      {item.coInvestors.map((coInvestor: any, idx: number) => (
                        <li key={idx} className="text-gray-700">
                          {coInvestor.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Display message if no data found */}
        {data && data.success && data.data.length === 0 && !isLoading && (
          <p className="text-gray-500 text-center">
            No data found for the given name. Please try a different entity.
          </p>
        )}

        {/* If no data or failure */}
        {/* {!isLoading && !data && !error && (
          <p className="text-gray-500 text-center">
            Please enter the details to get the network strength.
          </p>
        )} */}
      </div>
    </div>
  );
};

export default CollaborativeNetworkStrength;
