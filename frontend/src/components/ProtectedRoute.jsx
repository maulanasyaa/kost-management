import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const response = await fetch("http://localhost:8000/accounts/me", {
        credentials: "include",
      });
      if (response.ok) {
        setAuthenticated(true);
      }
      setLoading(false);
    }

    checkAuth();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!authenticated) return <Navigate to="/login" />;
  return children;
}
export default ProtectedRoute;
