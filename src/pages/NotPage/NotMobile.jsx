import React from "react";
import useGetNetwork from "../../hook/useGetNetwork";
import { QRCodeCanvas } from "qrcode.react";
import useCheckConnection from "../../hook/useCheckConnection";

export default function NotMobile() {
  // eslint-disable-next-line no-unused-vars
  const YouNetwork = useGetNetwork();
  const localIp = useCheckConnection();

  return (
    <div className="flex h-screen flex-col items-center gap-5 justify-center">
      <h1 className="text-xl text-bold max-w-sm text-center">
        Sorry, this website is not compatible with mobile devices.
        <br />
        Your IP address: {localIp}
      </h1>

      <div className="border-8 border-black rounded-md p-1">
        <QRCodeCanvas
          value={`https://my-topia-web.vercel.app/menu/table/5`}
          size={256}
          bgColor="#ffffff"
          fgColor="#000000"
          level="Q"
        />
      </div>
    </div>
  );
}
