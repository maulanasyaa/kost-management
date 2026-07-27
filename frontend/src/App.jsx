import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Rooms from "./pages/Rooms";
import Renters from "./pages/Renters";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/rooms"
        element={
          <ProtectedRoute>
            <Rooms></Rooms>
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/renters"
        element={
          <ProtectedRoute>
            <Renters></Renters>
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
}

export default App;
