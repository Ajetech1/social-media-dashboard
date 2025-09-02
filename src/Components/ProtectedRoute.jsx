import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // 👉 Pass message via state
    return (
      <Navigate
        to="/login"
        replace
        state={{
          fromProtected: true,
          message: "Not authorized, please log in.",
        }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
