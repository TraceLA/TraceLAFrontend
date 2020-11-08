import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import axios from "axios";
import MarkerClusterer from "@googlemaps/markerclustererplus";

const Map = () => {
  // Ref: https://medium.com/@zjor/heatmaps-with-google-map-react-57e279315060
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/coords", { params: { justLocation: true } })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("error to get map data, set to default");
        setData([
          { lat: 34.0732, lng: -118.243683 },
          { lat: 34.0722, lng: -118.243683 },
        ]);
      });
  }, []);

  const setGoogleMapRef = async (map, maps) => {
    const googleMapRef = map;
    const googleRef = maps;
    let markers =
      data &&
      data.map((location) => {
        return new googleRef.Marker({ position: location, label: "1" });
      });

    let markerClusterer = new MarkerClusterer(map, markers, {
      imagePath:
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
      gridSize: 20,
      minimumClusterSize: 2,
    });
  };

  const center = { lat: 34.0522, lng: -118.243683 };
  const zoom = 10;

  return (
    <div
      style={{
        height: "85vh",
        width: "65%",
      }}
    >
      {data.length ? (
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyCrj_Cm7ZRqiEr6PIHyNj - VGgsUGFvlVIk",
            libraries: ["visualization"],
          }}
          center={center}
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({ map, maps }) => setGoogleMapRef(map, maps)}
          defaultZoom={zoom}
        ></GoogleMapReact>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Map;
