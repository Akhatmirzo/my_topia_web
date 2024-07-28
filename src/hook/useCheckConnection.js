import { useEffect, useState } from "react";

export default function useCheckConnection() {
  const [localIP, setLocalIP] = useState("");

  useEffect(() => {
    const getLocalIP = async () => {
      return new Promise((resolve, reject) => {
        const RTCPeerConnection =
          window.RTCPeerConnection ||
          window.mozRTCPeerConnection ||
          window.webkitRTCPeerConnection;
        if (!RTCPeerConnection) {
          reject(new Error("WebRTC is not supported by this browser."));
          return;
        }

        const pc = new RTCPeerConnection({ iceServers: [] });
        const noop = () => {};
        pc.createDataChannel("");
        pc.createOffer(pc.setLocalDescription.bind(pc), noop);
        pc.onicecandidate = (ice) => {
          if (ice.candidate) {
            console.log(ice.candidate);
            let myIP = /^192\.168\.1\.\d{1,3}$/.test(ice.candidate.address);
            // let myIP = /^10\.10\.2\.\d{1,3}$/.test(ice.candidate.address);
            pc.onicecandidate = noop;

            if (myIP) {
              return resolve(ice.candidate.address);
            }
          }

          pc.oniceconnectionstatechange = (e) => {
            if (e.target.iceConnectionState === "connected") {
              pc.close();
            }
          };
        };
      });
    };

    getLocalIP()
      .then((ip) => setLocalIP(ip))
      .catch((error) => console.error("Error getting local IP:", error));
  }, []);

  return localIP || "0.0.0.0";
}
