import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  LoadScript,
  MarkerClusterer,
} from "@react-google-maps/api";
import BubbleChart from "@weknow/react-bubble-chart-d3";
import axios from "axios";
import "../styles/ToolPageStyles.css";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
  container: {
    width: "45vw",
    background: "#ffffff",
    border: "1px solid black",
  },
  tableTitle: {
    paddingLeft: 7,
  },
});

const HeatMap = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [results, setResults] = useState([]);

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

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const contactsRes = await axios.get("/contacts");
        const resultsRes = await axios.get("/results");
        setContacts(contactsRes.data);
        setResults(resultsRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHistory();
  }, []);

  console.log(results, contacts);

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

  function createKey(location) {
    return location.lat + location.lng + location.stamp;
  }

  function createBubbleData(data) {
    let bubbleData = [];
    if (data.length) {
      let bubbleMap = new Map();
      for (let i = 0; i < data.length; i++) {
        if (bubbleMap.has(data[i].tag)) {
          bubbleMap.set(data[i].tag, bubbleMap.get(data[i].tag) + 1);
        } else {
          bubbleMap.set(data[i].tag, 1);
        }
      }

      for (let [key, value] of bubbleMap.entries()) {
        bubbleData.push({ label: key, value: value });
      }
    }
    return bubbleData;
  }
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

        <BubbleChart
          graph={{
            zoom: 1,
            // offsetX: -0.05,
            // offsetY: -0.01,
          }}
          width={450}
          height={500}
          padding={5} // optional value, number that set the padding between bubbles
          showLegend={true} // optional value, pass false to disable the legend.
          legendPercentage={20} // number that represent the % of with that legend going to use.
          legendFont={{
            family: "Arial",
            size: 12,
            color: "#000",
            weight: "bold",
          }}
          valueFont={{
            family: "Arial",
            size: 12,
            color: "#fff",
            weight: "bold",
          }}
          labelFont={{
            family: "Arial",
            size: 16,
            color: "#fff",
            weight: "bold",
          }}
          //Custom bubble/legend click functions such as searching using the label, redirecting to other page
          // bubbleClickFunc={this.bubbleClick}
          // legendClickFun={this.legendClick}
          data={createBubbleData(data)}
        />
      </div>

      <div className="row">
        <TableContainer component={Paper} className={classes.container}>
          <Typography variant="h6" className={classes.tableTitle}>
            Contact History
          </Typography>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Username</TableCell>
                <TableCell align="left">Contact with</TableCell>
                <TableCell align="left">Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((row, indx) => (
                <TableRow key={indx}>
                  <TableCell component="th" scope="row" align="left">
                    {row.own_username}
                  </TableCell>
                  <TableCell align="left">{row.other_username}</TableCell>
                  <TableCell align="left">{row.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer component={Paper} className={classes.container}>
          <Typography variant="h6" className={classes.tableTitle}>
            Test Results
          </Typography>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Username</TableCell>
                <TableCell align="left">Result</TableCell>
                <TableCell align="left">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((row, indx) => (
                <TableRow key={indx}>
                  <TableCell component="th" scope="row" align="left">
                    {row.username}
                  </TableCell>
                  <TableCell align="left">
                    {row.result ? "positive" : "negative"}
                  </TableCell>
                  <TableCell align="left">{row.date.slice(0, 10)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default HeatMap;
