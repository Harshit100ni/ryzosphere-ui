import { Toaster } from "react-hot-toast";
import RyzosphereGraph from "./pages/index";
import CollaborativeNetworkStrength from "./pages/signals-ui/CollaborativeNetworkStrength";
import TrustedAdvisorScore from "./pages/signals-ui/TrustedAdvisorScore";
import NonObviousConnections from "./pages/signals-ui/NonObviousConnections";
import CoInvestPartnershipSynergy from "./pages/signals-ui/CoInvestPartnershipSynergy";
import ConflictOfInterest from "./pages/signals-ui/ConflictOfInterest";
import SPMatchedWithCountryAndInterestFO from "./pages/signals-ui/SPMatchedWithCountryAndInterestFO";
import FOMatchedWithCountryAndInter from "./pages/signals-ui/FOMatchedWithCountryAndInter";
import TopServiceProvidersFinder from "./pages/signals-ui/TopServiceProvidersFinder";
import TrustedAdvisorInterface from "./components/TrustedAdvisorInterface";

function App() {
  return (
    <>
      <Toaster />
      <RyzosphereGraph />
      <div className="max-w-[1380px] mx-auto px-4 py-8">
        {/* <h1 className="text-4xl font-bold p-6">Signals</h1> */}
        <div className="grid grid-cols-12 md:grid-cols-1 mx-auto">
          {/* <TrustedAdvisorInterface /> */}
          {/* <TrustedAdvisorScore />
          <CoInvestPartnershipSynergy />
          <CollaborativeNetworkStrength />
          <NonObviousConnections />
          <ConflictOfInterest /> */}
          {/* <SPMatchedWithCountryAndInterestFO />
          <FOMatchedWithCountryAndInter />
          <TopServiceProvidersFinder /> */}
        </div>
      </div>
    </>
  );
}

export default App;
