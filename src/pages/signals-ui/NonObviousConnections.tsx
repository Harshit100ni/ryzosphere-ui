import React, { useState } from "react";
import axiosConfig from "../../lib/axiosConfig";
import API_ENDPOINTS from "../../lib/endpoints";
import { useMutation } from "react-query";
import AutoComplete from "../../components/AutoComplete";

const fetchNonObviousConnections = async (foName: string): Promise<any> => {
  const response = await axiosConfig.get(
    API_ENDPOINTS.NON_OBVIOUS_CONNECTIONS,
    { params: { foName } }
  );
  return response.data;
};

const NonObviousConnections: React.FC = () => {
  const [entityName, setEntityName] = useState<string>("Silver Oak Capital"); // Default FO Name

  const { mutate, data, reset, isLoading, error } = useMutation(
    fetchNonObviousConnections
  );

  const handleSelect = (selectedName: string) => {
    setEntityName(selectedName);
    mutate(selectedName);
  };

  return (
    <div className="container max-w-2xl p-6">
      <div className=" bg-white p-6 rounded-lg shadow-xl border border-gray-200">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">
          Non-Obvious Connections
        </h1>
        <p className="text-gray-600 text-sm mb-4">
          Enter a <strong>Family Office`s</strong> name to check there
          Non-Obvious
        </p>
        <div className="mb-4">
          <AutoComplete
            placeholder="Enter the entity names"
            onSelect={handleSelect}
            handleOnClear={reset}
          />
        </div>

        {isLoading && <p className="text-gray-500">Fetching data...</p>}

        {error && (
          <p className="text-red-500">
            {(error as Error)?.message ??
              "Something went wrong. Please try again."}
          </p>
        )}

        {/* Display Non-Obvious Connections messages */}
        {data?.success && data?.messages?.length > 0 && (
          <div className="mt-6">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">
              Connections Found
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              {data.messages.map((message: string, index: number) => (
                <li key={index} className="text-gray-700 text-lg">
                  {message}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* If no data or failure */}
        {!isLoading && data?.success && data?.messages?.length === 0 && (
          <p className="text-gray-500">
            No non-obvious connections found for this Family Office.
          </p>
        )}
      </div>
    </div>
  );
};

export default NonObviousConnections;
