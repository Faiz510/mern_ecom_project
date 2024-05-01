import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const ProtectLayout = () => {
  const curUser = useAppSelector((state) => state?.auth?.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!curUser) {
      navigate("/signin");
    }
  }, [curUser, navigate]);

  return <>{curUser ? <Outlet /> : null}</>;
};

export default ProtectLayout;
