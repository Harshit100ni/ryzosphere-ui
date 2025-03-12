import React, { useState } from "react";
import axiosConfig from "../../lib/axiosConfig";
import API_ENDPOINTS from "../../lib/endpoints";
import { useMutation } from "react-query";
import AutoComplete from "../../components/AutoComplete";

const fetchConflictOfInterest = async (entityName: string): Promise<any> => {
  const response = await axiosConfig.get(API_ENDPOINTS.CONFLICT_OF_INTEREST, {
    params: { entityName },
  });
  return response.data;
};

const ConflictOfInterest: React.FC = () => {
  const [entityName, setEntityName] = useState<string>("Green Fields Group");

  const { mutate, data, isLoading, reset, error } = useMutation(
    fetchConflictOfInterest
  );

  const handleSelect = (selectedName: string) => {
    setEntityName(selectedName);
    mutate(selectedName);
  };

  return (
    <div className="container p-6 max-w-2xl">
      <div className="p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">
          Conflict of Interest
        </h1>
        <p className="text-gray-600 text-sm mb-4">
          Enter a <strong>Family Office`s</strong>name to check Conflict of
          Interest
        </p>
        <div className="mb-4">
          <AutoComplete
            placeholder="Enter Family Office Name"
            onSelect={handleSelect}
            handleOnClear={reset}
          />
        </div>

        {isLoading && <p className="text-gray-500">Fetching data...</p>}

        {error && <p className="text-red-500">{(error as Error).message}</p>}

        {data?.success && data?.data?.length > 0 && (
          <div className="space-y-6">
            {data.data.map((entity: any, index: number) => (
              <div key={index}>
                <h3 className="text-2xl font-semibold text-gray-900">
                  {entity?.entity}
                </h3>
                <p className="text-lg text-gray-700 mt-2">
                  {entity?.alerts?.length > 0
                    ? entity.alerts[0]
                    : "No conflicts detected."}
                </p>

                {/* Advisors Section */}
                {entity?.advisors?.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-xl font-semibold text-gray-800">
                      Advisors Involved:
                    </h4>
                    <div className="space-y-4 mt-2">
                      {entity.advisors.map((advisor: any, idx: number) => (
                        <div key={idx} className="bg-gray-100 p-4 rounded-lg">
                          <h5 className="text-lg font-medium">
                            {advisor?.name}
                          </h5>

                          <ul className="mt-2 space-y-2">
                            {advisor?.conflictDetails?.map(
                              (detail: any, i: number) => (
                                <li key={i} className="text-sm text-red-600">
                                  {detail?.alert}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Equity Vehicles Section */}
                {entity?.equityVehicles?.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-xl font-semibold text-gray-800">
                      Equity Vehicles Involved:
                    </h4>
                    <div className="space-y-4 mt-2">
                      {entity.equityVehicles.map(
                        (vehicle: any, idx: number) => (
                          <div key={idx} className="bg-gray-100 p-4 rounded-lg">
                            <h5 className="text-lg font-medium">
                              {vehicle?.name}
                            </h5>
                            <p className="text-sm text-gray-700 mt-1">
                              Involved Advisors:{" "}
                              {vehicle?.involvedAdvisors?.join(", ") || "None"}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* If no conflicts found */}
        {!isLoading && data?.success && data?.data?.length === 0 && (
          <p className="text-gray-500">
            No conflicts of interest found for this entity.
          </p>
        )}
      </div>
    </div>
  );
};

export default ConflictOfInterest;
