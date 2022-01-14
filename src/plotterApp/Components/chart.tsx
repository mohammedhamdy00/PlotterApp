import React, { useEffect, useState } from "react";
import apis from '../apis'
import { DropTarget } from "react-drag-drop-container";
import { Line } from "react-chartjs-2";

function Graph() {
  const [dimensionVal, setDimensionVal] = useState('')
  const [measureVal, setMeasureVal] = useState<string[]>([])
  const [graphResults, setGraphResults] = useState<any[]>([])
  const [xAxisData, setxAxisData] = useState<any[]>([])
  useEffect(() => {
    const payload = { measureVal, dimensionVal }
    if(payload.dimensionVal && payload.measureVal.length > 0){
      apis.getData(payload).then((response: any) => {
        if(response){
          setGraphResults(response?.body)
          setxAxisData(response?.body[0])
        }
      });
    }
  }, [measureVal, dimensionVal])
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF".split("");
    let color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const dataSets = graphResults?.map((item) => {
    const color = getRandomColor();
    return {
      label: item.name,
      data: item.values,
      fill: false,
      backgroundColor: color,
      borderColor: color,
    };
  });
  const data = {
    labels: xAxisData?.values,
    datasets: dataSets,
  };
  const dropped = (e) => {
    const measures = e.dragData.name;
    const measuresList = [...measureVal]
    if (e.dragData.function === "dimension") {
      setDimensionVal(e.dragData.name)
    } else if (e.dragData.function === "measure") {
      if (measuresList.indexOf(measures) === -1) {
        measuresList.push(measures);
        setMeasureVal(measuresList)
      }
    }
  };
  const clear = (name) => {
    if (name === "dimension") {
      setDimensionVal('')
    } else if (name === "measure") {
      setMeasureVal([])
    }
  };

  return (
    <div className="ChartContainer">
      <div className="Inputs">
        <div className="Input-Container">
          <label>Dimensions</label>
          <DropTarget targetKey="dimension" onHit={dropped}>
            <div className="Input-Box">
              {dimensionVal && (
                <span className="Input-Val">{dimensionVal}</span>
              )}
            </div>
          </DropTarget>
          {dimensionVal && (
            <span className="ClearBtn" onClick={() => clear("dimension")}>
              Clear
            </span>
          )}
        </div>
        <div className="Input-Container">
          <label>Measures</label>
          <DropTarget
            targetKey="measure"
            onHit={dropped}
          >
            <div
              className="Input-Box"
            >
              {measureVal &&
                measureVal.map((item) => (
                  <span className="Input-Val">{item}</span>
                ))}
            </div>
          </DropTarget>
          {measureVal.length > 0 && (
            <span className="ClearBtn" onClick={() => clear("measure")}>
              Clear
            </span>
          )}
        </div>
      </div>

      <div className="graphContainer">
        {dimensionVal === "" &&
          measureVal.length === 0 ? (
          <div className="noVal">
            <p>Please Add Dimension and Measures</p>
          </div>
        ) : dimensionVal === "" ? (
          <div className="noVal">
            <p>Please Add a Dimension</p>
          </div>
        ) : measureVal.length === 0 ? (
          <div className="noVal">
            <p>Please Add a Measure</p>
          </div>
        ) : (
          <Line data={data} type="line"/>
        )}
      </div>
    </div>
  );
}
export default Graph;
