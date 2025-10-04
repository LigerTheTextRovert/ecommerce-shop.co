import type { RootState } from "../features/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface RouteProtectionProps {
  children: React.ReactNode;
}
export const RouteProtection = ({ children }: RouteProtectionProps) => {
  const { isUserAuthenticated } = useSelector((state: RootState) => state.auth);
  if (isUserAuthenticated) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace />;
  }
};
