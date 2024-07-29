import { useEffect, useState } from "react";

export default function useGetNetwork() {
  const [localUrl, setLocalUrl] = useState("");
  const [networkUrl, setNetworkUrl] = useState("");

  useEffect(() => {
    // Local URLni olish
    const local = window.location.origin;
    // console.log(window.location);
    setLocalUrl(local);

    // Network URLni olish uchun external API
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        const network = `http://${data.ip}:${window.location.port}`;
        // console.log(data);
        setNetworkUrl(network);
      })
      .catch((error) => console.error("Error fetching IP:", error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { local: localUrl, network: networkUrl };
}
