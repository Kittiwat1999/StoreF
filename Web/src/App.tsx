import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import RoutesConfig from "./RoutesConfig";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
        <RoutesConfig />
        <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
