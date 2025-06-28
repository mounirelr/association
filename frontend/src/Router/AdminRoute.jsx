import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = JSON.parse(localStorage.getItem("connectedUser")).role;

    if (userRole !== "Admin") {
      navigate("/post");
    }
  }, [navigate]);

  return children;
};

export default AdminRoute;
