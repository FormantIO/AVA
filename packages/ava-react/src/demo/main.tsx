
import ReactDOM from 'react-dom';
import React, { useEffect, useState }from 'react';
import { InsightCard } from '../InsightCard';
import { getInsights, InsightInfo } from "@formant/ava";
import 'antd/dist/antd.css';


const App = () => {

   
    const [insights, setInsights] = useState<InsightInfo[]>([]);
  // Sample data for the InsightCard
  const sampleData = [
    {
        "time": "2025-03-19 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "CPU",
        "unit": "C",
        "value": 41.01294875228525,
        "name": "$.host.temperature",
        "type": "numeric set"
    },
    {
        "time": "2025-03-19 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "thermal",
        "unit": "C",
        "value": 39.19233671413941,
        "name": "$.host.temperature",
        "type": "numeric set"
    },
    {
        "time": "2025-03-19 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "GPU",
        "unit": "C",
        "value": 38.65977502707361,
        "name": "$.host.temperature",
        "type": "numeric set"
    },
    {
        "time": "2025-03-20 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "thermal",
        "unit": "C",
        "value": 41.33233992758036,
        "name": "$.host.temperature",
        "type": "numeric set"
    },
    {
        "time": "2025-03-20 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "GPU",
        "unit": "C",
        "value": 40.74777895509006,
        "name": "$.host.temperature",
        "type": "numeric set"
    },
    {
        "time": "2025-03-20 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "CPU",
        "unit": "C",
        "value": 43.19466599909179,
        "name": "$.host.temperature",
        "type": "numeric set"
    },
    {
        "time": "2025-03-21 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "CPU",
        "unit": "C",
        "value": 43.69244984160507,
        "name": "$.host.temperature",
        "type": "numeric set"
    },
    {
        "time": "2025-03-21 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "GPU",
        "unit": "C",
        "value": 41.3194297782471,
        "name": "$.host.temperature",
        "type": "numeric set"
    },
    {
        "time": "2025-03-21 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "thermal",
        "unit": "C",
        "value": 41.8460764255574,
        "name": "$.host.temperature",
        "type": "numeric set"
    },
    {
        "time": "2025-03-22 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "CPU",
        "unit": "C",
        "value": 44.32475137204699,
        "name": "$.host.temperature",
        "type": "numeric set"
    },
    {
        "time": "2025-03-22 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "GPU",
        "unit": "C",
        "value": 42.23008902006804,
        "name": "$.host.temperature",
        "type": "numeric set"
    },
    {
        "time": "2025-03-22 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "thermal",
        "unit": "C",
        "value": 42.749447032460544,
        "name": "$.host.temperature",
        "type": "numeric set"
    },
    {
        "time": "2025-03-23 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "CPU",
        "unit": "C",
        "value": 39.58273297564041,
        "name": "$.host.temperature",
        "type": "numeric set"
    },
    {
        "time": "2025-03-23 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "GPU",
        "unit": "C",
        "value": 37.58094063151034,
        "name": "$.host.temperature",
        "type": "numeric set"
    },
    {
        "time": "2025-03-23 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "thermal",
        "unit": "C",
        "value": 37.997311483806264,
        "name": "$.host.temperature",
        "type": "numeric set"
    },
    {
        "time": "2025-03-24 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "thermal",
        "unit": "C",
        "value": 42.68184319655315,
        "name": "$.host.temperature",
        "type": "numeric set"
    },
    {
        "time": "2025-03-24 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "CPU",
        "unit": "C",
        "value": 44.27589264755745,
        "name": "$.host.temperature",
        "type": "numeric set"
    },
    {
        "time": "2025-03-24 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "GPU",
        "unit": "C",
        "value": 42.22556140945724,
        "name": "$.host.temperature",
        "type": "numeric set"
    },
    {
        "time": "2025-03-25 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "thermal",
        "unit": "C",
        "value": 42.49976992971086,
        "name": "$.host.temperature",
        "type": "numeric set"
    },
    {
        "time": "2025-03-25 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "GPU",
        "unit": "C",
        "value": 42.02632934101895,
        "name": "$.host.temperature",
        "type": "numeric set"
    },
    {
        "time": "2025-03-25 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "CPU",
        "unit": "C",
        "value": 44.24809382215651,
        "name": "$.host.temperature",
        "type": "numeric set"
    }
  ];

//   const secondSampleData = [
//     {
//         "time": "2025-03-19 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "autowalk",
//         "value": 0.0005073491009475491,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-19 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "pose",
//         "value": 0,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-19 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "stairs",
//         "value": 0,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-19 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "sit",
//         "value": 0.9985077967619189,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-19 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "walk",
//         "value": 0.0015220473028426471,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-19 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "ptz",
//         "value": 0,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-19 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "docked",
//         "value": 0.9933298515257778,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-20 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "ptz",
//         "value": 0,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-20 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "walk",
//         "value": 0,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-20 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "docked",
//         "value": 1,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-20 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "sit",
//         "value": 1,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-20 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "pose",
//         "value": 0,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-20 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "autowalk",
//         "value": 0,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-20 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "stairs",
//         "value": 0,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-21 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "pose",
//         "value": 0,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-21 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "autowalk",
//         "value": 0.0014268927312405574,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-21 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "stairs",
//         "value": 0,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-21 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "ptz",
//         "value": 0,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-21 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "walk",
//         "value": 0.43847574282356894,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-21 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "docked",
//         "value": 0.5615242571764311,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-21 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "sit",
//         "value": 0.5615242571764311,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-23 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "sit",
//         "value": 1,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-23 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "stairs",
//         "value": 0,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-23 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "ptz",
//         "value": 0,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-23 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "docked",
//         "value": 1,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-23 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "pose",
//         "value": 0,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-23 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "autowalk",
//         "value": 0,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-23 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "walk",
//         "value": 0,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-24 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "ptz",
//         "value": 0,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-24 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "sit",
//         "value": 0.9986804315764961,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-24 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "autowalk",
//         "value": 0.0009314600636497711,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-24 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "pose",
//         "value": 0,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-24 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "stairs",
//         "value": 0,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-24 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "walk",
//         "value": 0.0013195684235038424,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-24 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "docked",
//         "value": 0.9986804315764961,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-25 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "stairs",
//         "value": 0,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-25 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "walk",
//         "value": 0,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-25 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "sit",
//         "value": 1,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-25 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "ptz",
//         "value": 0,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-25 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "pose",
//         "value": 0,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-25 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "autowalk",
//         "value": 0,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     },
//     {
//         "time": "2025-03-25 00:00:00",
//         "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
//         "label": "docked",
//         "value": 1,
//         "name": "state.movement.mode",
//         "type": "bitset"
//     }
// ];

  const fetchInsights =  () => {

  const insightResult = getInsights(sampleData, {
    // limit: 10,
    // measures: [
    //   { fieldName: "life_expect", method: "MEAN" },
    //   { fieldName: "pop", method: "SUM" },
    //   { fieldName: "fertility", method: "MEAN" },
    // { fieldName: "label", method: "MEAN" },
    // { fieldName: "pop", method: "SUM" },
    // { fieldName: "value", method: "MEAN" },
    // ],
    insightTypes: ["category_outlier", "time_series_outlier",  "trend", "correlation", "majority"],
    // Add a custom color palette to avoid using @ant-design/colors
  });

  setInsights(insightResult.insights);
 
}

  useEffect(() => {
    fetchInsights();
  }, []);

 


  return (
    <div style={{ padding: '20px' }}>
      <h1>AVA React Demo</h1>
      <div style={{ width: '600px', margin: '20px auto' }}>
        
  {false ? (
    <div className="text-center py-4 text-gray-400">
      <div className="animate-pulse">Loading insights...</div>
    </div>
  ) : insights.length === 0 ? (
    <div className="text-center py-4 text-gray-400">
      No insights available for this data
    </div>
  ) : (
    insights.map((insight, index) => (
      <InsightCard 
        title={"$.cpu"}
        key={`insight-${index}`} 
        insightInfo={insight}
        className="w-full" 
        footerTools={[]}
      />
    ))
  )}
      </div>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
); 