import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import RoutesConfig from "./RoutesConfig";
import { BuyerStateProvider } from "./contexts/BuyerStateContext";

function App() {
  return (
    <BrowserRouter>
      <BuyerStateProvider>
        <RoutesConfig />
        <Toaster position="top-right" reverseOrder={false} />
      </BuyerStateProvider>
    </BrowserRouter>
  );
}

export default App;
