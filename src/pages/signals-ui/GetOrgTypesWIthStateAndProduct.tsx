import axiosConfig from "../../lib/axiosConfig";
import API_ENDPOINTS from "../../lib/endpoints";
import { useState } from "react";
import { FaIndustry, FaTruck, FaWarehouse, FaBuilding } from "react-icons/fa";
import { useGetStateList } from "../../query/useGetStatesList";
import { useGetProductTags } from "../../query/useGetProductTags";
import { ChevronDown, ChevronUp } from "lucide-react";
import { dropdownAerrow } from "../../assets";

type Organization = {
  organizationID: string;
  company: string | null;
  organizationType: string;
  state: string;
  product: string;
};

const signals = [
  "Get Orgnization With Same and Product",
  // "Market Expansion Potential",
  // "Supplier Distribution Analysis",
];

const GetOrgTypeWithStateAndProduct = () => {
  const [selectedSignal, setSelectedSignal] = useState(signals[0]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [orgData, setOrgData] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const { data: stateList } = useGetStateList();
  const { data: productTags } = useGetProductTags();

  const typeIcons: { [key: string]: JSX.Element } = {
    Distributor: <FaTruck className="text-blue-500 text-xl" />,
    Processor: <FaIndustry className="text-green-500 text-xl" />,
    Supplier: <FaWarehouse className="text-orange-500 text-xl" />,
    Producer: <FaBuilding className="text-purple-500 text-xl" />,
  };

  const [isDataFetched, setIsDataFetched] = useState(false); // Track data fetch status

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
      setIsDataFetched(true); // Mark data as fetched
    } catch (error) {
      console.error("Error fetching data:", error);
      setOrgData([]);
      setIsDataFetched(true); // Mark data as fetched even in case of error
    }
    setLoading(false);
  };

  // Group Data by Organization Type
  const groupedData = (Array.isArray(orgData) ? orgData : []).reduce(
    (acc: Record<string, Organization[]>, org) => {
      if (!acc[org.organizationType]) acc[org.organizationType] = [];
      acc[org.organizationType].push(org);
      return acc;
    },
    {}
  );

  return (
    <div className="flex bg-white rounded-lg overflow-hidden">
      {/* Left Section - Signal List */}

      <div className="w-3/6 pr-2 border-r">
        <ul className="space-y-2">
          {signals.map((signal) => (
            <li
              key={signal}
              onClick={() => setShowCard(!showCard)}
              className="cursor-pointer p-3 w-full rounded-lg bg-[#F7F7F7] text-[#4C4D4F]"
            >
              <div className="flex justify-between items-center">
                {signal}
                {showCard ? <ChevronUp /> : <ChevronDown />}
              </div>
            </li>
          ))}
        </ul>
        <div
          className={`transition-all duration-300 shadow-lg overflow-hidden ${
            showCard ? "h-auto" : "h-0"
          }`}
        >
          <div className="w-full p-2 shadow-lg border-2 border-gray-100 mt-3">
            <p className="text-gray-600 text-sm mb-4">
              Select a State and Product Type to find organizations.
            </p>
            <div className="flex gap-x-4 items-center justify-evenly mb-6">
              <div className="relative">
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="border border-gray-300 appearance-none rounded-md px-4 py-2 w-40 focus:ring-2 focus:ring-blue-400 outline-none"
                >
                  <option value="" disabled>
                    Select State
                  </option>
                  {stateList?.map((state: string) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                <img
                  src={dropdownAerrow}
                  alt="Dropdown Arrow"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
                />
              </div>

              <div className="relative">
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="border border-gray-300 appearance-none rounded-md px-4 py-2 w-40 focus:ring-2 focus:ring-blue-400 outline-none"
                >
                  <option value="" disabled>
                    Select Product
                  </option>
                  {productTags?.map((product: string) => (
                    <option key={product} value={product}>
                      {product}
                    </option>
                  ))}
                </select>
                <img
                  src={dropdownAerrow}
                  alt="Dropdown Arrow"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
                />
              </div>

              <button
                disabled={!selectedState || !selectedProduct}
                onClick={fetchData}
                className={`px-4 py-2 text-white rounded-lg ${
                  !selectedState || !selectedProduct
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#1D4A72]"
                }`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Selection & Results */}
      <div className="w-full">
        {loading ? (
          <div className="flex justify-center items-center w-full h-full">
            <p className="mt-4 t text-gray-600">Loading...</p>
          </div>
        ) : (
          <>
            {/* {showCard && Object.keys(groupedData).length <= 0 && (
              <p>NO Result found</p>
            )} */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full h-full pl-4 ">
              {Object.keys(groupedData).length > 0 ? (
                Object.keys(groupedData).map((type) => (
                  <div
                    key={type}
                    className="bg-gray-100 p-4 rounded-lg shadow-md"
                  >
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        {" "}
                        {typeIcons[type] || "🏭"} {type}
                      </h3>
                      <div>
                        <span className="text-gray-600">{selectedProduct}</span>
                      </div>
                    </div>
                    <ul className="list-none space-y-2">
                      {groupedData[type].map((org, index) => (
                        <li
                          key={index}
                          className="p-3 bg-white shadow-md rounded-md flex justify-between items-center"
                        >
                          <span className="font-medium">
                            {org.organizationID}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <p className="text-gray-500"></p>
              )}
              {isDataFetched && Object.keys(groupedData).length === 0 && (
                <p className="text-gray-600 text-center flex items-center">
                  No Results Found
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GetOrgTypeWithStateAndProduct;
