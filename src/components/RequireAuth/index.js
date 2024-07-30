import React, { useMemo } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import EmployerLayout from "../../layouts/EmployerLayout";

export default function RequireAuth({ AllowedRole }) {
  const role = useMemo(() => {
    const role = localStorage.getItem("role");
    return role;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AllowedRole]);

  if (AllowedRole && role === AllowedRole) {
    if (AllowedRole === "admin") {
      return <AdminLayout />;
    } else if (AllowedRole === "employer") {
      return <EmployerLayout />;
    } else {
      return <div>Unauthorized</div>;
    }
  } else {
    return <div>Unauthorized</div>;
  }
}
