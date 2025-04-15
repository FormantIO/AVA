import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import { InsightCard } from '../InsightCard';
import { getInsights, InsightInfo } from "@formant/ava";
import 'antd/dist/antd.css';

// New function to generate sample data
const generateSampleData = (days: number = 7, baseValue: number = 100, trend: number = 5, noise: number = 2) => {
  const data = [];
  const labels = ['CPU', 'GPU', 'Memory'];
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Generate data for each label
    labels.forEach(label => {
      const value = baseValue + (trend * i) + (Math.random() * noise - noise/2);
      data.push({
        time: date.toISOString().split('T')[0],
        device_id: "test-device",
        label: label,
        value: value,
        name: "system_metrics",
        type: "numeric set"
      });
    });
  }

  return data.reverse();
};

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
        "value": 42.27589264755745,
        "name": "$.host.temperature",
        "type": "numeric set"
    },
    {
        "time": "2025-03-24 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "GPU",
        "unit": "C",
        "value": 43.22556140945724,
        "name": "$.host.temperature",
        "type": "numeric set"
    },
    {
        "time": "2025-03-25 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "thermal",
        "unit": "C",
        "value": 43.49976992971086,
        "name": "$.host.temperature",
        "type": "numeric set"
    },
    {
        "time": "2025-03-25 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "GPU",
        "unit": "C",
        "value": 43.02632934101895,
        "name": "$.host.temperature",
        "type": "numeric set"
    },
    {
        "time": "2025-03-25 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "CPU",
        "unit": "C",
        "value": 60.24809382215651,
        "name": "$.host.temperature",
        "type": "numeric set"
    }
  ];

  const thirdSampleData =  [
    {
        "time": "2024-12-10 00:00:00",
        "value": 1,
        "label": "error",
        "message": "Could not upload the mission: : "
    },
    {
        "time": "2024-12-10 00:00:00",
        "value": 1,
        "label": "error",
        "message": "Could not parse the graph"
    },
    {
        "time": "2024-12-10 00:00:00",
        "value": 1,
        "label": "error",
        "message": "Failed to open file for reading: /spot_integration_top/maps/graph_mission_!"
    },
    {
        "time": "2024-12-10 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2024-12-10 00:00:00",
        "value": 1,
        "label": "info",
        "message": "Mission ended with state: 1"
    },
    {
        "time": "2024-12-10 00:00:00",
        "value": 1,
        "label": "error",
        "message": "Failed to complete the velocity command: "
    },
    {
        "time": "2024-12-10 00:00:00",
        "value": 1,
        "label": "error",
        "message": "Robot is estopped. Please use an external E-Stop client, such as the estop Python SDK example, to configure E-Stop."
    },
    {
        "time": "2024-12-10 00:00:00",
        "value": 1,
        "label": "error",
        "message": "Failed to complete the stand command as we don't own the lease and can't take it "
    },
    {
        "time": "2024-12-10 00:00:00",
        "value": 1,
        "label": "info",
        "message": "Uploading graph from: /spot_integration_top/maps/graph_mission_1"
    },
    {
        "time": "2024-12-10 00:00:00",
        "value": 1,
        "label": "info",
        "message": "Playing mission"
    },
    {
        "time": "2024-12-10 00:00:00",
        "value": 1,
        "label": "error",
        "message": "Failed to complete the teleop command as we don't own the lease and can't take it"
    },
    {
        "time": "2024-12-10 00:00:00",
        "value": 1,
        "label": "error",
        "message": "Failed to complete the stand command as we don't own the lease and can't take it"
    },
    {
        "time": "2024-12-10 00:00:00",
        "value": 1,
        "label": "error",
        "message": "Failed to complete the play mission command as we don't own the lease and can't take it "
    },
    {
        "time": "2024-12-10 00:00:00",
        "value": 1,
        "label": "error",
        "message": "Failed to open file for reading: /spot_integration_top/maps/missions/mission_!"
    },
    {
        "time": "2024-12-10 00:00:00",
        "value": 1,
        "label": "info",
        "message": "Finished uploading mission"
    },
    {
        "time": "2024-12-10 00:00:00",
        "value": 1,
        "label": "error",
        "message": "Could not upload the mission: :"
    },
    {
        "time": "2024-12-10 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device offline"
    },
    {
        "time": "2024-12-10 00:00:00",
        "value": 1,
        "label": "error",
        "message": "Failed to complete the teleop command as we don't own the lease and can't take it "
    },
    {
        "time": "2024-12-10 00:00:00",
        "value": 1,
        "label": "error",
        "message": "Failed to complete the play mission command as we don't own the lease and can't take it"
    },
    {
        "time": "2024-12-10 00:00:00",
        "value": 1,
        "label": "error",
        "message": "The StandCommand failed or timed out."
    },
    {
        "time": "2024-12-10 00:00:00",
        "value": 1,
        "label": "error",
        "message": "Could not parse the mission file"
    },
    {
        "time": "2024-12-10 00:00:00",
        "value": 1,
        "label": "error",
        "message": "Failed to complete the velocity command:"
    },
    {
        "time": "2024-12-10 00:00:00",
        "value": 1,
        "label": "info",
        "message": "Uploading graph from: /spot_integration_top/maps/graph_mission_!"
    },
    {
        "time": "2024-12-11 00:00:00",
        "value": 1,
        "label": "error",
        "message": "Failed to complete the teleop command as we don't own the lease and can't take it "
    },
    {
        "time": "2024-12-11 00:00:00",
        "value": 1,
        "label": "error",
        "message": "Failed to complete the stand command as we don't own the lease and can't take it"
    },
    {
        "time": "2024-12-11 00:00:00",
        "value": 1,
        "label": "error",
        "message": "Failed to complete the teleop command as we don't own the lease and can't take it"
    },
    {
        "time": "2024-12-11 00:00:00",
        "value": 1,
        "label": "info",
        "message": "Finished uploading mission"
    },
    {
        "time": "2024-12-11 00:00:00",
        "value": 1,
        "label": "error",
        "message": "No dock found"
    },
    {
        "time": "2024-12-11 00:00:00",
        "value": 1,
        "label": "error",
        "message": "Failed to complete the stand command as we don't own the lease and can't take it "
    },
    {
        "time": "2024-12-11 00:00:00",
        "value": 1,
        "label": "info",
        "message": "Mission ended with state: 1"
    },
    {
        "time": "2024-12-11 00:00:00",
        "value": 1,
        "label": "info",
        "message": "Playing mission"
    },
    {
        "time": "2024-12-11 00:00:00",
        "value": 1,
        "label": "info",
        "message": "Uploading graph from: /spot_integration_top/maps/graph_mission_1"
    },
    {
        "time": "2024-12-17 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2024-12-20 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2024-12-26 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device offline"
    },
    {
        "time": "2024-12-26 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2024-12-30 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device offline"
    },
    {
        "time": "2025-01-01 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-01-02 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device offline"
    },
    {
        "time": "2025-01-02 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-01-07 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device offline"
    },
    {
        "time": "2025-01-07 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-01-08 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-01-09 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device offline"
    },
    {
        "time": "2025-01-09 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-01-12 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-01-12 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device offline"
    },
    {
        "time": "2025-01-13 00:00:00",
        "value": 1,
        "label": "error",
        "message": "Dock not in view, please move closer to dock and re-issue command."
    },
    {
        "time": "2025-01-16 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-01-17 00:00:00",
        "value": 1,
        "label": "warning",
        "message": "broken wheel"
    },
    {
        "time": "2025-01-17 00:00:00",
        "value": 1,
        "label": "error",
        "message": "oh no"
    },
    {
        "time": "2025-01-17 00:00:00",
        "value": 1,
        "label": "info",
        "message": "bad camera"
    },
    {
        "time": "2025-01-17 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-01-20 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-01-21 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device offline"
    },
    {
        "time": "2025-01-21 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-01-22 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device offline"
    },
    {
        "time": "2025-01-22 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-01-25 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-01-26 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-01-26 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device offline"
    },
    {
        "time": "2025-01-27 00:00:00",
        "value": 1,
        "label": "error",
        "message": "Dock not in view, please move closer to dock and re-issue command."
    },
    {
        "time": "2025-01-27 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device offline"
    },
    {
        "time": "2025-01-27 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-01-28 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-01-28 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device offline"
    },
    {
        "time": "2025-01-28 00:00:00",
        "value": 1,
        "label": "error",
        "message": "Dock not in view, please move closer to dock and re-issue command."
    },
    {
        "time": "2025-01-29 00:00:00",
        "value": 1,
        "label": "error",
        "message": "bosdyn.api.PowerCommandResponse (KeepaliveMotorsOffError): Cannot power on while Keepalive requests motors off."
    },
    {
        "time": "2025-01-30 00:00:00",
        "value": 1,
        "label": "error",
        "message": "bosdyn.api.PowerCommandResponse (KeepaliveMotorsOffError): Cannot power on while Keepalive requests motors off."
    },
    {
        "time": "2025-01-31 00:00:00",
        "value": 1,
        "label": "error",
        "message": "bosdyn.api.PowerCommandResponse (KeepaliveMotorsOffError): Cannot power on while Keepalive requests motors off."
    },
    {
        "time": "2025-01-31 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device offline"
    },
    {
        "time": "2025-01-31 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-02-05 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-02-11 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-02-12 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-02-12 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device offline"
    },
    {
        "time": "2025-02-13 00:00:00",
        "value": 1,
        "label": "error",
        "message": "Docking Failed, status: 'STATUS_ERROR_NOT_AVAILABLE'"
    },
    {
        "time": "2025-02-13 00:00:00",
        "value": 1,
        "label": "error",
        "message": "Dock not in view, please move closer to dock and re-issue command."
    },
    {
        "time": "2025-02-13 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device offline"
    },
    {
        "time": "2025-02-13 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-02-14 00:00:00",
        "value": 1,
        "label": "error",
        "message": "Dock not in view, please move closer to dock and re-issue command."
    },
    {
        "time": "2025-02-17 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-02-17 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device offline"
    },
    {
        "time": "2025-02-18 00:00:00",
        "value": 1,
        "label": "error",
        "message": "Dock not in view, please move closer to dock and re-issue command."
    },
    {
        "time": "2025-02-18 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-02-19 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device offline"
    },
    {
        "time": "2025-02-19 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-02-20 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-02-20 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device offline"
    },
    {
        "time": "2025-02-25 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device offline"
    },
    {
        "time": "2025-02-25 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-02-26 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device offline"
    },
    {
        "time": "2025-02-26 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-02-27 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-02-27 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device offline"
    },
    {
        "time": "2025-02-28 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-03-01 00:00:00",
        "value": 1,
        "label": "error",
        "message": "Dock not in view, please move closer to dock and re-issue command."
    },
    {
        "time": "2025-03-01 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device offline"
    },
    {
        "time": "2025-03-01 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-03-03 00:00:00",
        "value": 1,
        "label": "info",
        "message": "SpotBase Service Restarted, starting up..."
    },
    {
        "time": "2025-03-03 00:00:00",
        "value": 1,
        "label": "error",
        "message": "Dock not in view, please move closer to dock and re-issue command."
    },
    {
        "time": "2025-03-03 00:00:00",
        "value": 1,
        "label": "error",
        "message": "bosdyn.api.PowerCommandResponse (EstoppedError): Cannot power on while estopped; inspect EStopState for more info."
    },
    {
        "time": "2025-03-03 00:00:00",
        "value": 1,
        "label": "info",
        "message": "SpotBase Service Started."
    },
    {
        "time": "2025-03-03 00:00:00",
        "value": 1,
        "label": "info",
        "message": "Restarting SpotBase Service"
    },
    {
        "time": "2025-03-04 00:00:00",
        "value": 1,
        "label": "error",
        "message": "Dock not in view, please move closer to dock and re-issue command."
    },
    {
        "time": "2025-03-04 00:00:00",
        "value": 1,
        "label": "error",
        "message": "bosdyn.api.PowerCommandResponse (KeepaliveMotorsOffError): Cannot power on while Keepalive requests motors off."
    },
    {
        "time": "2025-03-05 00:00:00",
        "value": 1,
        "label": "error",
        "message": "Docking Failed, status: 'STATUS_ERROR_NOT_AVAILABLE'"
    },
    {
        "time": "2025-03-05 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-03-11 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-03-12 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device offline"
    },
    {
        "time": "2025-03-12 00:00:00",
        "value": 1,
        "label": "error",
        "message": "Dock not in view, please move closer to dock and re-issue command."
    },
    {
        "time": "2025-03-13 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-03-17 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-03-18 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-03-19 00:00:00",
        "value": 1,
        "label": "error",
        "message": "Dock not in view, please move closer to dock and re-issue command."
    },
    {
        "time": "2025-03-21 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device offline"
    },
    {
        "time": "2025-03-21 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-03-22 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device online"
    },
    {
        "time": "2025-03-22 00:00:00",
        "value": 1,
        "label": "info",
        "message": "device offline"
    },
    {
        "time": "2025-03-24 00:00:00",
        "value": 1,
        "label": "error",
        "message": "vahag got in the way of the robot"
    },
    {
        "time": "2025-03-28 00:00:00",
        "value": 1,
        "label": "error",
        "message": "Dock not in view, please move closer to dock and re-issue command."
    },
    {
        "time": "2025-03-28 00:00:00",
        "value": 1,
        "label": "info",
        "message": "someone in the way"
    }
];


  

  const secondSampleData = [
    {
        "time": "2025-03-19 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "autowalk",
        "value": 0.0005073491009475491,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-19 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "pose",
        "value": 0,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-19 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "stairs",
        "value": 0,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-19 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "sit",
        "value": 0.9985077967619189,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-19 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "walk",
        "value": 0.0015220473028426471,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-19 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "ptz",
        "value": 0,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-19 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "docked",
        "value": 0.9933298515257778,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-20 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "ptz",
        "value": 0,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-20 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "walk",
        "value": 0,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-20 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "docked",
        "value": 1,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-20 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "sit",
        "value": 1,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-20 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "pose",
        "value": 0,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-20 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "autowalk",
        "value": 0,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-20 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "stairs",
        "value": 0,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-21 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "pose",
        "value": 0,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-21 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "autowalk",
        "value": 0.0014268927312405574,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-21 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "stairs",
        "value": 0,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-21 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "ptz",
        "value": 0,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-21 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "walk",
        "value": 0.43847574282356894,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-21 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "docked",
        "value": 0.5615242571764311,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-21 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "sit",
        "value": 0.5615242571764311,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-23 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "sit",
        "value": 1,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-23 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "stairs",
        "value": 0,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-23 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "ptz",
        "value": 0,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-23 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "docked",
        "value": 1,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-23 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "pose",
        "value": 0,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-23 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "autowalk",
        "value": 0,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-23 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "walk",
        "value": 0,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-24 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "ptz",
        "value": 0,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-24 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "sit",
        "value": 0.9986804315764961,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-24 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "autowalk",
        "value": 0.0009314600636497711,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-24 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "pose",
        "value": 0,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-24 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "stairs",
        "value": 0,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-24 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "walk",
        "value": 0.0013195684235038424,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-24 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "docked",
        "value": 0.9986804315764961,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-25 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "stairs",
        "value": 0,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-25 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "walk",
        "value": 0,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-25 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "sit",
        "value": 1,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-25 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "ptz",
        "value": 0,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-25 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "pose",
        "value": 0,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-25 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "autowalk",
        "value": 0,
        "name": "state.movement.mode",
        "type": "bitset"
    },
    {
        "time": "2025-03-25 00:00:00",
        "device_id": "b0990d5a-cdff-4c3c-ab71-c6c72be385ad",
        "label": "docked",
        "value": 1,
        "name": "state.movement.mode",
        "type": "bitset"
    }
];

  const fetchInsights =  () => {
 //generateSampleData()
  const insightResult = getInsights(thirdSampleData , {
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