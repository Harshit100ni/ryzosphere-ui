import { Toaster } from "react-hot-toast";
import RyzosphereGraph from "./pages/index";

import GetOrgTypeWithStateAndProduct from "./pages/signals-ui/GetOrgTypesWIthStateAndProduct";
import VerticalStackedBarChart from "./components/VerticalStackedBarChart";

function App() {
  return (
    <>
      <Toaster />
      <RyzosphereGraph />
      <div className="max-w-full mx-40 py-8">
        {/* <h1 className="text-4xl font-bold p-6">Signals</h1> */}
        <div className="grid grid-cols-12 md:grid-cols-1 mx-auto">
          <GetOrgTypeWithStateAndProduct />
        </div>
      </div>
      {/* <VerticalStackedBarChart /> */}
    </>
  );
}

export default App;
