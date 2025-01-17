import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./features/store";
import AuthLayout from "./layouts/Layout";

function App() {
  return (
    <>
      <div className="flex flex-col overflow-hidden bg-white">
        {/* COMMON ROUTES */}
        <Routes>
          <Route path="/auth" element={AuthLayout}>
            <Route path="login" />
            <Route path="register" />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
