import React from 'react';
import './SortingVisualizer.css';
import * as SortingAlgos from '../SortingAlgos/SortingAlgos.js';

export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);

        this.state={
            array:[],
        };
    }

    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        const array=[];
        for(let i=0;i<30;i++){
            array.push(randomIntFromInterval(5,500));
        }
        this.setState({array});
    }

    mergeSort(){
       const animations = SortingAlgos.mergeSort(this.state.array);
  const arrayBars = document.getElementsByClassName('array-bar');

  for (let i = 0; i < animations.length; i++) {
    const isColorChange = i % 3 !== 2;

    if (isColorChange) {
      const [barOneIdx, barTwoIdx] = animations[i];
      const color = i % 3 === 0 ? 'red' : 'turquoise';
      setTimeout(() => {
        arrayBars[barOneIdx].style.backgroundColor = color;
        arrayBars[barTwoIdx].style.backgroundColor = color;
      }, i * 10);
    } else {
      setTimeout(() => {
        const [barIdx, newHeight] = animations[i];
        arrayBars[barIdx].style.height = `${newHeight}px`;
      }, i * 10);
    }
  }

    //   const JSSortedArray=this.state.array.slice().sort((a,b)=>a-b);
    //   const sortedArr=SortingAlgos.mergeSort(this.state.array);
      

    //   console.log(arraysAreEqual(JSSortedArray,sortedArr));
    }
    quickSort() {
  const animations = SortingAlgos.quickSort(this.state.array);
  const arrayBars = document.getElementsByClassName('array-bar');

  for (let i = 0; i < animations.length; i++) {
    const animation = animations[i];

    if (animation[0] === "compare" || animation[0] === "revert") {
      const [_, barOneIdx, barTwoIdx] = animation;
      const color = animation[0] === "compare" ? "red" : "turquoise";
      setTimeout(() => {
        arrayBars[barOneIdx].style.backgroundColor = color;
        arrayBars[barTwoIdx].style.backgroundColor = color;
      }, i * 10);
    } else if (animation[0] === "swap") {
      const [_, barIdx, newHeight] = animation;
      setTimeout(() => {
        arrayBars[barIdx].style.height = `${newHeight}px`;
      }, i * 10);
    }
  }
}

    bubbleSort() {
  const animations = SortingAlgos.bubbleSort(this.state.array);
  const arrayBars = document.getElementsByClassName('array-bar');

  for (let i = 0; i < animations.length; i++) {
    const animation = animations[i];

    if (animation[0] === "compare" || animation[0] === "revert") {
      const [_, barOneIdx, barTwoIdx] = animation;
      const color = animation[0] === "compare" ? "red" : "turquoise";
      setTimeout(() => {
        arrayBars[barOneIdx].style.backgroundColor = color;
        arrayBars[barTwoIdx].style.backgroundColor = color;
      }, i * 10);
    } else if (animation[0] === "swap") {
      const [_, barIdx, newHeight] = animation;
      setTimeout(() => {
        arrayBars[barIdx].style.height = `${newHeight}px`;
      }, i * 10);
    }
  }
}

    heapSort() {
  const animations = SortingAlgos.heapSort(this.state.array);
  const arrayBars = document.getElementsByClassName('array-bar');

  for (let i = 0; i < animations.length; i++) {
    const animation = animations[i];

    if (animation[0] === "compare" || animation[0] === "revert") {
      const [_, barOneIdx, barTwoIdx] = animation;
      const color = animation[0] === "compare" ? "red" : "turquoise";
      setTimeout(() => {
        arrayBars[barOneIdx].style.backgroundColor = color;
        arrayBars[barTwoIdx].style.backgroundColor = color;
      }, i * 10);
    } else if (animation[0] === "swap") {
      const [_, barIdx, newHeight] = animation;
      setTimeout(() => {
        arrayBars[barIdx].style.height = `${newHeight}px`;
      }, i * 10);
    }
  }
}


    // testSortingAlgos(){
    //     for(let i=0;i<100;i++){
    //         const array=[];
    //         const length=randomIntFromInterval(1,1000);
    //         for(let i=0;i<length;i++){
    //             array.push(randomIntFromInterval(-1000,1000));
    //         }   

    //         const JSSortedArray=this.state.array.slice().sort((a,b)=>a-b);
    //   const sortedArr=SortingAlgos.mergeSort(this.state.array);
      

    //   console.log(arraysAreEqual(JSSortedArray,sortedArr));
    //     }
    // }

    render(){
        const {array}=this.state;

        return(
            <div className='array-container'>
            {array.map((value,idx)=>(
                <div className='array-bar' key={idx} style={{height:`${value}px`}}>
                    
                </div>
            ))}

            <button onClick={()=>this.resetArray()}>Generate New Array</button>
            <button onClick={()=>this.mergeSort()}>Merge Sort</button>
            <button onClick={()=>this.quickSort()}>Quick Sort</button>
            <button onClick={()=>this.bubbleSort()}>Bubble Sort</button>
            <button onClick={()=>this.heapSort()}>Heap Sort</button>
            {/* <button onClick={()=>this.testSortingAlgos()}>Testing Sorted Algo.</button> */}
            </div>
        )
    }
}

function randomIntFromInterval(min,max){
    return Math.floor(Math.random() *(max-min+1)+min);
}

function arraysAreEqual(firstArr,secondArr){
    if(firstArr.length!==secondArr.length)return false;
    for(let i=0;i<firstArr.length;i++){
        if(firstArr[i]!==secondArr[i])return false;
    }
    return true;
}
