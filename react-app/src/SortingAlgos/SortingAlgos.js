// export const getMergeSortAnimations

// export const mergeSort=(array,startIdx,endIdx,animations=[])=>{
//     if(array.length===1)return array;
//     const middleIdx=Math.floor((endIdx+1-startIdx)/2);
//     const firstHalf=mergeSort(array,startIdx,middleIdx,animations);
//     const secondHalf=mergeSort(array,middleIdx+1,endIdx,animations);
//     const sortedArr=[];
//     let i=startIdx, j=middleIdx+1;
//     while(i<firstHalf.length && j<secondHalf.length){
//         if(firstHalf[i]<secondHalf[j]){
//             sortedArr.push(firstHalf[i++]);
//         }
//         else{
//             sortedArr.push(secondHalf[j++]);
//         }
//     }

//     while(i<firstHalf.length)sortedArr.push(firstHalf[i++]);
//     while(j<secondHalf.length)sortedArr.push(secondHalf[j++]);
//     return sortedArr;
// };


export function mergeSort(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}



export function quickSort(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const arrCopy = array.slice();
  quickSortHelper(arrCopy, 0, arrCopy.length - 1, animations);
  return animations;
}

function quickSortHelper(array, low, high, animations) {
  if (low < high) {
    const pivotIndex = partition(array, low, high, animations);
    quickSortHelper(array, low, pivotIndex - 1, animations);
    quickSortHelper(array, pivotIndex + 1, high, animations);
  }
}

function partition(array, low, high, animations) {
  const pivot = array[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    // Color change (comparing j with pivot)
    animations.push(["compare", j, high]);
    animations.push(["revert", j, high]);

    if (array[j] < pivot) {
      i++;
      // Swap array[i] and array[j]
      animations.push(["swap", i, array[j]]);
      animations.push(["swap", j, array[i]]);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  // Final pivot swap
  animations.push(["compare", i + 1, high]);
  animations.push(["revert", i + 1, high]);
  animations.push(["swap", i + 1, array[high]]);
  animations.push(["swap", high, array[i + 1]]);
  const temp = array[i + 1];
  array[i + 1] = array[high];
  array[high] = temp;

  return i + 1;
}


export function bubbleSort(array) {
  const animations = [];
  const arr = array.slice();
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Compare arr[j] and arr[j + 1]
      animations.push(["compare", j, j + 1]);  // Highlight
      animations.push(["revert", j, j + 1]);   // Unhighlight

      if (arr[j] > arr[j + 1]) {
        // Swap arr[j] and arr[j + 1]
        animations.push(["swap", j, arr[j + 1]]);
        animations.push(["swap", j + 1, arr[j]]);
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return animations;
}



 export function heapSort(array) {
  const animations = [];
  const arr = array.slice();
  const n = arr.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, animations);
  }

  // One by one extract elements
  for (let i = n - 1; i > 0; i--) {
    // Swap arr[0] with arr[i]
    animations.push(["compare", 0, i]);
    animations.push(["revert", 0, i]);
    animations.push(["swap", 0, arr[i]]);
    animations.push(["swap", i, arr[0]]);

    const temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;

    heapify(arr, i, 0, animations); // Reduce heap size
  }

  return animations;
}

function heapify(arr, n, i, animations) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n) {
    animations.push(["compare", left, largest]);
    animations.push(["revert", left, largest]);
    if (arr[left] > arr[largest]) {
      largest = left;
    }
  }

  if (right < n) {
    animations.push(["compare", right, largest]);
    animations.push(["revert", right, largest]);
    if (arr[right] > arr[largest]) {
      largest = right;
    }
  }

  if (largest !== i) {
    animations.push(["swap", i, arr[largest]]);
    animations.push(["swap", largest, arr[i]]);
    const temp = arr[i];
    arr[i] = arr[largest];
    arr[largest] = temp;

    heapify(arr, n, largest, animations);
  }
}




