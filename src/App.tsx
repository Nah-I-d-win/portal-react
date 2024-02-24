import React, { useEffect, useState } from "react";
import FractalRenderer from "./components/FractalRenderer";
import { NewtonRaphsonZ3 } from "./fractals/newton_raphson_z3";
import { FragmentRequest } from "./models/fragment_request";
import { RenderingData } from "./models/rendering_data";

function App() {
  const [data, setData] = useState<RenderingData[]>([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8686/ws/");

    ws.onopen = () => {
      console.log("WebSocket connection established");
      const fragmentRequest = new FragmentRequest("freactal", 100);
      ws.send(JSON.stringify(fragmentRequest));
    };

    ws.onmessage = (event: MessageEvent) => {
      console.log("Message from server received");
      const newData: RenderingData = JSON.parse(event.data);
      console.log(newData);
      setData((prevData) => [...prevData, newData]);
    };

    ws.onerror = (error: Event) => {
      console.error("WebSocket error: ", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Cleanup function
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <FractalRenderer data={data} width={300} height={300} />
    </div>
  );
}

export default App;
