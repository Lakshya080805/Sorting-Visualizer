import React from 'react';
import './SortingVisualizer.css';
import * as SortingAlgos from '../SortingAlgos/SortingAlgos.js';



export default class SortingVisualizer extends React.Component{
    // constructor(props){
    //     super(props);

    //     this.state={
    //         array:[],
    //     };

    constructor(props){
  super(props);
  this.state = {
    array: [],
    speed: 50,
    sortTime: null,
    comparisonResults: [],  // Add these here!
  };
}
    

    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
       const array = [];
  for (let i = 0; i < 30; i++) {
    array.push(randomIntFromInterval(5, 500));
  }
  this.setState({ array, sortTime: null });
    }

    mergeSort(){
       const animations = SortingAlgos.mergeSort(this.state.array);
  const arrayBars = document.getElementsByClassName('array-bar');

  const start = performance.now(); 

  for (let i = 0; i < animations.length; i++) {
    const isColorChange = i % 3 !== 2;

    if (isColorChange) {
      const [barOneIdx, barTwoIdx] = animations[i];
      const color = i % 3 === 0 ? 'red' : 'turquoise';
      setTimeout(() => {
        arrayBars[barOneIdx].style.backgroundColor = color;
        arrayBars[barTwoIdx].style.backgroundColor = color;
      }, i * this.state.speed);
    } else {
      setTimeout(() => {
        const [barIdx, newHeight] = animations[i];
        arrayBars[barIdx].style.height = `${newHeight}px`;
      }, i * this.state.speed);
    }
  }

    setTimeout(() => {
    const end = performance.now();
    this.setState({ sortTime: `${Math.floor(end - start)} ms` });
  }, animations.length * this.state.speed);
    }
    quickSort() {
  const animations = SortingAlgos.quickSort(this.state.array);
  const arrayBars = document.getElementsByClassName('array-bar');

  const start = performance.now(); 

  for (let i = 0; i < animations.length; i++) {
    const animation = animations[i];

    if (animation[0] === "compare" || animation[0] === "revert") {
      const [_, barOneIdx, barTwoIdx] = animation;
      const color = animation[0] === "compare" ? "red" : "turquoise";
      setTimeout(() => {
        arrayBars[barOneIdx].style.backgroundColor = color;
        arrayBars[barTwoIdx].style.backgroundColor = color;
      },i * this.state.speed);
    } else if (animation[0] === "swap") {
      const [_, barIdx, newHeight] = animation;
      setTimeout(() => {
        arrayBars[barIdx].style.height = `${newHeight}px`;
      }, i * this.state.speed);
    }
  }

  setTimeout(() => {
    const end = performance.now();
    this.setState({ sortTime: `${Math.floor(end - start)} ms` });
  }, animations.length * this.state.speed);
}

    bubbleSort() {
  const animations = SortingAlgos.bubbleSort(this.state.array);
  const arrayBars = document.getElementsByClassName('array-bar');

  const start = performance.now(); 

  for (let i = 0; i < animations.length; i++) {
    const animation = animations[i];

    if (animation[0] === "compare" || animation[0] === "revert") {
      const [_, barOneIdx, barTwoIdx] = animation;
      const color = animation[0] === "compare" ? "red" : "turquoise";
      setTimeout(() => {
        arrayBars[barOneIdx].style.backgroundColor = color;
        arrayBars[barTwoIdx].style.backgroundColor = color;
      }, i * this.state.speed);
    } else if (animation[0] === "swap") {
      const [_, barIdx, newHeight] = animation;
      setTimeout(() => {
        arrayBars[barIdx].style.height = `${newHeight}px`;
      }, i * this.state.speed);
    }
  }


  

  setTimeout(() => {
    const end = performance.now();
    this.setState({ sortTime: `${Math.floor(end - start)} ms` });
  }, animations.length * this.state.speed);
}

    heapSort() {
  const animations = SortingAlgos.heapSort(this.state.array);
  const arrayBars = document.getElementsByClassName('array-bar');

  const start = performance.now(); 

  for (let i = 0; i < animations.length; i++) {
    const animation = animations[i];

    if (animation[0] === "compare" || animation[0] === "revert") {
      const [_, barOneIdx, barTwoIdx] = animation;
      const color = animation[0] === "compare" ? "red" : "turquoise";
      setTimeout(() => {
        arrayBars[barOneIdx].style.backgroundColor = color;
        arrayBars[barTwoIdx].style.backgroundColor = color;
      }, i * this.state.speed);
    } else if (animation[0] === "swap") {
      const [_, barIdx, newHeight] = animation;
      setTimeout(() => {
        arrayBars[barIdx].style.height = `${newHeight}px`;
      }, i * this.state.speed);
    }
  }

  setTimeout(() => {
    const end = performance.now();
    this.setState({ sortTime: `${Math.floor(end - start)} ms` });
  }, animations.length * this.state.speed);
}


compareAllSorts() {
  const generateRandomArray = () => {
    const array = [];
    for (let i = 0; i < 300; i++) {
      array.push(randomIntFromInterval(5, 1000));
    }
    return array;
  };

  const array = generateRandomArray();

  const sorts = [
    { name: "Merge Sort", fn: SortingAlgos.mergeSort },
    { name: "Quick Sort", fn: SortingAlgos.quickSort },
    { name: "Bubble Sort", fn: SortingAlgos.bubbleSort },
    { name: "Heap Sort", fn: SortingAlgos.heapSort },
  ];

  // console.log("=== Sorting Time Comparison ===");
  // sorts.forEach(({ name, fn }) => {
  //   const arrCopy = array.slice();
  //   const start = performance.now();
  //   fn(arrCopy); // assumes each fn returns animations but internally sorts
  //   const end = performance.now();
  //   // console.log(`${name}: ${Math.floor(end - start)} ms`);
  //   console.log(`${name}: ${(end - start).toFixed(3)} ms`);

  // });

  const results = sorts.map(({ name, fn }) => {
  const arrCopy = array.slice();
  const start = performance.now();
  fn(arrCopy);
  const end = performance.now();
  const time = (end - start).toFixed(3);
  return { name, time };
});

this.setState({ comparisonResults: results });

}


    

    render(){
        const {array}=this.state;

//         return(
//             <div className='array-container'>
//             {array.map((value,idx)=>(
//                 <div className='array-bar' key={idx} style={{height:`${value}px`}}>
                    
//                 </div>
//             ))}
            
//           <p style={{ color: 'white', fontWeight: 'bold', marginTop: '20px' }}>
//   Sort Execution Time: {this.state.sortTime}
// </p>
 
//  <button onClick={() => this.compareAllSorts()}>Compare All Sorts</button>


//             <button onClick={()=>this.resetArray()}>Generate New Array</button>
//             <button onClick={()=>this.mergeSort()}>Merge Sort</button>
//             <button onClick={()=>this.quickSort()}>Quick Sort</button>
//             <button onClick={()=>this.bubbleSort()}>Bubble Sort</button>
//             <button onClick={()=>this.heapSort()}>Heap Sort</button>
//             {/* <button onClick={()=>this.testSortingAlgos()}>Testing Sorted Algo.</button> */}
//             </div>
//         )


return (
  <div className='array-container'>
    <div className='bar-wrapper'>
      {array.map((value, idx) => (
        <div
  className='array-bar'
  key={idx}
  style={{ height: `${value}px` }}
/>

      ))}
    </div>

    <p style={{ color: 'white', fontWeight: 'bold', marginTop: '10px' }}>
      Sort Execution Time: {this.state.sortTime}
    </p>

    {this.state.comparisonResults.length > 0 && (
  <div style={{ color: 'white', marginTop: '1rem' }}>
    <h3>Sort Time Comparison:</h3>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {this.state.comparisonResults.map((res, idx) => (
        <li key={idx}>
          <strong>{res.name}:</strong> {res.time} ms
        </li>
      ))}
    </ul>
  </div>
)}


    <div className='controls'>
      <button onClick={() => this.compareAllSorts()}>Compare All Sorts</button>
      <button onClick={() => this.resetArray()}>Generate New Array</button>
      <button onClick={() => this.mergeSort()}>Merge Sort</button>
      <button onClick={() => this.quickSort()}>Quick Sort</button>
      <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
      <button onClick={() => this.heapSort()}>Heap Sort</button>
    </div>
  </div>
);

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
