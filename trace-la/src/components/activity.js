import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  LoadScript,
  MarkerClusterer,
} from "@react-google-maps/api";
import axios from "axios";
import "../styles/ToolPageStyles.css";

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


const HeatMap = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await axios.get("/coords");
        setData(res.data);
      } catch (error) {
        console.log("error to get map data, set to default");
        setData([
          {
            lat: 34.0732,
            lng: -118.244683,
            stamp: "error time01",
            username: "error1",
          },
          {
            lat: 34.0722,
            lng: -118.243683,
            stamp: "error time02",
            username: "error2",
          },
        ]);
      }
    };
    fetchCoords();
  }, []);

  const libraries = ["places"];
  const options = {
    minZoom: 2.8,
    disableDefaultUI: true,
  };
  const mapContainerStyle = {
    width: "60vw",
    height: "60vh",
  };

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
  });

  const clusterstyles = [
    {
      height: 53,
      url: "clusterer/m1.png",
      width: 53,
      anchorText: [-5, -4.5],
    },
    {
      height: 56,
      url: "clusterer/m2.png",
      width: 56,
      anchorText: [-5, -4.5],
    },
    {
      height: 66,
      url: "clusterer/m3.png",
      width: 66,
      anchorText: [-10, -11.5],
    },
    {
      height: 66,
      url: "clusterer/m3.png",
      width: 66,
      anchorText: [-10, -11.5],
    },
    {
      height: 66,
      url: "clusterer/m3.png",
      width: 66,
      anchorText: [-10, -11.5],
    },
  ];

  const clusteroptions = {
    imagePath: "clusterer/m",
    styles: clusterstyles,
  };

  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const center = { lat: 34.0522, lng: -118.243683 };

  return (
    <div style={{ display: "grid" }} className="body">
      <div className="row">
        <h1 style={{ color: "white" }}>Dashboard</h1>
      </div>
      <div className="row">
        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          libraries={libraries}
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            options={options}
            center={center}
            onLoad={onMapLoad}
          >
            <MarkerClusterer options={clusteroptions}>
              {(clusterer) =>
                data.map((location, indx) => (
                  <Marker
                    key={indx}
                    position={location}
                    clusterer={clusterer}
                    label={{
                      fontWeight: "bold",
                      text: "1",
                      fontFamily: "Roboto",
                    }}
                    icon={{
                      url: "clusterer/whitedot.svg",
                    }}
                    onClick={() => {
                      if (
                        !selected ||
                        selected.lat !== location.lat ||
                        selected.lng !== location.lng
                      ) {
                        setSelected(location);
                      } else {
                        panTo(selected);
                      }
                    }}
                  />
                ))
              }
            </MarkerClusterer>
            {selected ? (
              <InfoWindow
                position={{ lat: selected.lat, lng: selected.lng }}
                onCloseClick={() => setSelected(null)}
                onClick={panTo(selected)}
              >
                <div>
                  <p style={{ fontWeight: "500", fontSize: "large" }}>
                    {selected.tag}
                  </p>
                  <p>{selected.username}</p>
                </div>
              </InfoWindow>
            ) : (
              ""
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};


const CoordsGraph = () => {
  const [dailyData, setDailyData] = useState([]);
  
  useEffect(() => {
    const fetchAggResults = async () => {
      try {
        const daily = await axios.get("/aggregateCoordsByDate");
        setDailyData(daily.data);
      } catch (error) {
        console.log("error to get aggregate results, set to default");
        setDailyData([]);
      }
    };
    fetchAggResults();
  }, []);
  
  function createCoordsGraphData(data) {
    let contactsData = [];
    for (let i = 0; i < data.length; i++) {
      let curDateStr = data[i]['date_trunc'].slice(0,10);
      let curDateComponents = curDateStr.split("-")
      let curCt = parseInt(data[i]['count']);
      contactsData.push([Date.UTC(parseInt(curDateComponents[0]), parseInt(curDateComponents[1])-1, parseInt(curDateComponents[2])), curCt]);
    }
    return contactsData;
  }

  const options = {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'User Location Logs'
    },
    yAxis: {
      title: {
          text: 'Number of coordinate logs recorded'
      },
      min: 0
  },
    xAxis: {
      type: 'datetime',
      title: {
          text: 'Date'
      }
  },
    series: [
      {
        name: "Location stamps per day",
        data: createCoordsGraphData(dailyData)
      }
    ]
  };

  return (
    <div style={{ display: "grid" }} className="body">  
    <div className="row">
     <HighchartsReact highcharts={Highcharts} options={options} />
      </div>      
    </div>
  );
};

const ActivityVisuals = () => {
  return (
    <div style={{ display: "grid" }} className="body">  
     <HeatMap />
     <CoordsGraph />
    </div>
  );
};


export default ActivityVisuals;
