import React, { useEffect, useState} from "react";
import BubbleChart from "@weknow/react-bubble-chart-d3";
import axios from "axios";
import "../styles/ToolPageStyles.css";

const TagsChart = () => {
  const [data, setData] = useState([]);

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

  function createBubbleData(data) {
    let bubbleData = [];
    if (data.length) {
      let bubbleMap = new Map();
      for (let i = 0; i < data.length; i++) {
        if (bubbleMap.has(data[i].tag)) {
          bubbleMap.set(data[i].tag, bubbleMap.get(data[i].tag) + 1);
        } else if(data[i].tag.length){
          bubbleMap.set(data[i].tag, 1);
        }
      }

      for (let [key, value] of bubbleMap.entries()) {
        bubbleData.push({ label: key, value: value });
      }
    }
    
    return bubbleData;
  }

  return (
    <div style={{ display: "grid" }} className="body">
      <div className="row">
        <BubbleChart
          graph={{
            zoom: 1,
          }}
          width={700}
          height={700}
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
    </div>
  );
};

export default TagsChart;
