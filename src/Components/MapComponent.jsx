import React, { useEffect, useRef, useState } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Draw, Modify, Snap } from "ol/interaction";
import { fromLonLat } from "ol/proj";
import { useNavigate } from "react-router-dom";

const MapComponent = ({ user, setUser }) => {
  const mapRef = useRef(null);
  const vectorSourceRef = useRef(new VectorSource());
  const drawRef = useRef(null);
  const modifyRef = useRef(null);
  const snapRef = useRef(null);
  const navigate = useNavigate();

  const [activeTool, setActiveTool] = useState(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new Map({
        target: "map",
        layers: [
          new TileLayer({ source: new OSM() }),
          new VectorLayer({ source: vectorSourceRef.current }),
        ],
        view: new View({ center: fromLonLat([0, 0]), zoom: 2 }),
      });
    }
  }, []);

  const activateTool = (tool) => {
    if (drawRef.current) mapRef.current.removeInteraction(drawRef.current);
    if (modifyRef.current) mapRef.current.removeInteraction(modifyRef.current);
    if (snapRef.current) mapRef.current.removeInteraction(snapRef.current);

    if (tool === "draw") {
      drawRef.current = new Draw({ source: vectorSourceRef.current, type: "Polygon" });
      mapRef.current.addInteraction(drawRef.current);
    } else if (tool === "edit") {
      modifyRef.current = new Modify({ source: vectorSourceRef.current });
      snapRef.current = new Snap({ source: vectorSourceRef.current });
      mapRef.current.addInteraction(modifyRef.current);
      mapRef.current.addInteraction(snapRef.current);
    }

    setActiveTool(tool);
  };

  const clearPolygons = () => {
    vectorSourceRef.current.clear();
    setActiveTool(null);
  };

  const handleSubmit = () => {
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="max-w-3xl mx-auto p-6 bg-gray-900 text-white shadow-xl rounded-xl w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">Map with Polygon Drawing</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={user.mobile}
            onChange={(e) => setUser({ ...user, mobile: e.target.value })}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-center space-x-4 my-4">
          <button
            className={`px-4 py-2 rounded bg-blue-500 hover:bg-blue-700 text-white font-semi-bold ${activeTool === "draw" ? "ring-2 ring-blue-300" : ""}`}
            onClick={() => activateTool("draw")}>
            Draw Polygon
          </button>
          <button
            className={`px-4 py-2 rounded bg-blue-500 hover:bg-blue-700 text-white font-semi-bold ${activeTool === "edit" ? "ring-2 ring-green-300" : ""}`}
            onClick={() => activateTool("edit")}>
            Edit Polygon
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-700 text-white font-semi-bold"
            onClick={clearPolygons}>
            Clear Polygon
          </button>
        </div>
        <div id="map" className="w-full h-96 mt-4 rounded-lg border border-gray-600 bg-gray-800"></div>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleSubmit}
            className="w-28 flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-semi-bold py-2 px-4 rounded">
            Enter
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;