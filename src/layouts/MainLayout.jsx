import React, { useEffect, useState } from "react";
import TopNav from "../components/TopNav";
import { Outlet, useNavigate } from "react-router-dom";
import useGetWindowWidth from "../hook/useGetWindowWidth";
import NotMobile from "../pages/NotPage/NotMobile";
import useCheckConnection from "../hook/useCheckConnection";
import CheckConnection from "../pages/NotPage/CheckConnection";

export default function MainLayout() {
  const [isConnect, setIsConnect] = useState(false);
  const navigate = useNavigate();
  const windowWidth = useGetWindowWidth();
  const localIp = useCheckConnection();

  useEffect(() => {
    if (localIp !== "0.0.0.0") {
      setIsConnect(true);
    } else {
      setIsConnect(true);
    }
  }, [localIp, isConnect, navigate]);

  return (
    <div>
      {windowWidth.innerWidth <= 540 ? (
        <>
          {isConnect ? (
            <>
              <TopNav />
              <div>
                <Outlet />
              </div>
            </>
          ) : <CheckConnection />}
        </>
      ) : (
        <NotMobile />
      )}
    </div>
  );
}
