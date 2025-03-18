import axiosConfig from "../../lib/axiosConfig";
import API_ENDPOINTS from "../../lib/endpoints";
import { useState } from "react";
import { FaIndustry, FaTruck, FaWarehouse, FaBuilding } from "react-icons/fa";
import { useGetStateList } from "../../query/useGetStatesList";
import { useGetProductTags } from "../../query/useGetProductTags";

type Organization = {
  organizationID: string;
  company: string | null;
  organizationType: string;
  state: string;
  product: string;
};

const GetOrgTypeWithStateAndProduct = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [orgData, setOrgData] = useState<Organization[]>([]); // ✅ Explicit Type
  const [loading, setLoading] = useState(false);

  const { data: stateList, isLoading } = useGetStateList();
  const { data: productTags } = useGetProductTags();

  const typeIcons: { [key: string]: JSX.Element } = {
    Distributor: <FaTruck className="text-blue-500 text-xl" />,
    Processor: <FaIndustry className="text-green-500 text-xl" />,
    Supplier: <FaWarehouse className="text-orange-500 text-xl" />,
    Producer: <FaBuilding className="text-purple-500 text-xl" />,
  };

  // Fetch Data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.GET_ORG_WITH_STATE_PRODUCT,
        {
          params: { state: selectedState, product: selectedProduct },
        }
      );

      setOrgData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setOrgData([]); // Handle errors gracefully
    }
    setLoading(false);
  };

  // Group Data by Organization Type (Ensure orgData is an array)
  const groupedData = (Array.isArray(orgData) ? orgData : []).reduce(
    (acc: Record<string, Organization[]>, org) => {
      if (!acc[org.organizationType]) {
        acc[org.organizationType] = [];
      }
      acc[org.organizationType].push(org);
      return acc;
    },
    {}
  );

  console.log("groupedData", groupedData);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      {/* <h1 className="text-3xl font-semibold mb-6 ">
        Collaborative Network Strength
      </h1> */}
      <h1 className="text-3xl font-semibold mb-6">
        🏢 Organization Type Finder
      </h1>
      <p className="text-gray-600 text-lg mb-4">
        Select a State and Product Type to get Organizations with their
        respective types.
      </p>

      {/* Selection Inputs */}
      <div className="flex gap-4 flex-wrap">
        {/* State Selection */}
        <div className="flex flex-col">
          {/* <label className="text-gray-700 font-medium mb-1">Select State</label> */}
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="border-2 border-gray-300 rounded-md px-4 py-2 w-40 focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="" disabled>
              Select State{" "}
            </option>
            {stateList?.map((state: string) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* Product Selection */}
        <div className="flex flex-col">
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="border-2 border-gray-300 rounded-md px-4 py-2 w-40 focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="" disabled>
              Select Product{" "}
            </option>
            {productTags?.map((product: string) => (
              <option key={product} value={product}>
                {product}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            disabled={selectedProduct === "" || selectedState === ""}
            onClick={fetchData}
            className={`px-6 py-2 text-white rounded-lg
    ${
      selectedProduct === "" || selectedState === ""
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-[#1D4A72]"
    }`}
          >
            Fetch Orgnization
          </button>
        </div>
      </div>

      {/* Fetch Button */}

      {/* Loading Indicator */}
      {loading && <p className="mt-4 text-gray-600">Loading...</p>}

      {/* Grouped Data Display */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.keys(groupedData).length > 0 ? (
          Object.keys(groupedData).map((type) => (
            <div key={type} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="flex items-center gap-2 mb-3">
                {typeIcons[type] || "🏭"}
                <h3 className="text-lg font-semibold">{type}</h3>
              </div>
              <ul className="list-none">
                {groupedData[type].map((org, index) => (
                  <li
                    key={index}
                    className="p-2 bg-white shadow-sm rounded-md mb-2 flex justify-between"
                  >
                    <span className="font-medium">{org.organizationID}</span>
                    <span className="text-gray-600">{org.product}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default GetOrgTypeWithStateAndProduct;
