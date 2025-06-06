"use client";

import useAuthStore from "@/store/auth";
import Forbidden from "@/app/forbidden";
import Unauthorized from "@/app/unauthorized";

type Role = "admin" | "patient" | "doctor";

const withAuth = (
  WrappedComponent: React.ComponentType<any>,
  allowedRoles?: Role[]
) => {
  const ComponentWithAuth = (props: any) => {
    const { isLoggedIn, role } = useAuthStore();

    if (!isLoggedIn) {
      return <Unauthorized />;
    }

    if (allowedRoles && !allowedRoles.includes(role as Role)) {
      return <Forbidden />;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
