import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRouter = () => {
  const { currentUser } = useSelector((state) => state.auth);
  return currentUser ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouter;