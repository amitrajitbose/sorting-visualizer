import React, { Component } from "react";
import {
  ARRAY_ELEMENT_MIN,
  ARRAY_ELEMENT_MAX,
  ARRAY_SIZE,
  ARRAY_SIZE_MAX,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
} from "../constants";
import { getMergeSortAnimations } from "../SortAlgorithms/MergeSort";
import "./SortingVisualizer.css";

export default class SortingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: ARRAY_SIZE,
      array: [],
      algo: null,
      delay: 10,
    };
  }

  componentDidMount() {
    this.refreshArray();
  }
  refreshArray() {
    const arr = [];
    for (let i = 0; i < this.state.size; i++) {
      arr.push(getRandomInt(ARRAY_ELEMENT_MIN, ARRAY_ELEMENT_MAX));
    }
    this.setState({ array: arr });
  }
  changeAlgo = (event) => {
    this.setState({ algo: event.target.value });
  };
  start() {
    switch (this.state.algo) {
      case "mergesort":
        this.mergeSort();
        break;
      case "bubblesort":
        console.log("Bubble");
        break;
      default:
        break;
    }
  }
  handleSizeChange = (event) => {
    let newSize = parseInt(event.target.value);
    newSize = Math.max(1, newSize);
    newSize = Math.min(ARRAY_SIZE_MAX, newSize);
    this.setState({ size: newSize });
  };
  handleDelayChange = (event) => {
    this.setState({ delay: parseInt(event.target.value) });
  };
  getWidth() {
    let w = Math.floor((window.screen.width * 0.6) / this.state.size);
    // console.log(window.screen.width, w);
    return w;
  }
  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("arrayBar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.delay);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * this.state.delay);
      }
    }
  }
  render() {
    console.table(this.state);
    const { array } = this.state;
    return (
      <>
        <h4>Sorting Visualizer</h4>
        <div className="barsContainer">
          {array.map((val, idx) => {
            return (
              <div
                className="arrayBar"
                key={idx}
                style={{
                  height: `${val}px`,
                  width: `${this.getWidth()}px`,
                  backgroundColor: PRIMARY_COLOR,
                }}
              ></div>
            );
          })}
        </div>
        <div className="buttonContainer">
          <div className="settings">
            <label>
              Length:
              <input
                type="text"
                name="size"
                onChange={this.handleSizeChange}
                size="6"
              />
            </label>
          </div>

          <div className="settings">
            <select
              id="lang"
              onChange={this.changeAlgo}
              value={this.state.algo}
            >
              <option value="">Select Algorithm</option>
              <option value="mergesort">Merge Sort</option>
              <option value="bubblesort">Bubble Sort</option>
            </select>
          </div>

          <div className="settings">
            <label>
              Delay:
              <input
                id="delay"
                type="range"
                min="1"
                max="1000"
                value={this.state.delay}
                onChange={this.handleDelayChange}
                step="10"
              />
            </label>
          </div>

          <div className="settings">
            <button onClick={() => this.refreshArray()}>Reset</button>
          </div>

          <div className="settings">
            <button onClick={() => this.start()}>Start</button>
          </div>
        </div>
      </>
    );
  }
}

function getRandomInt(minn, maxx) {
  return Math.floor(Math.random() * (maxx - minn + 1) + minn);
}
