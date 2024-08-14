const submitBtn = document.querySelector(".submit-btn") as HTMLElement;
const startBtn = document.getElementById("start-btn") as HTMLElement;
const stopBtn = document.getElementById("stop-btn") as HTMLElement;
const resumeBtn = document.getElementById("resume-btn") as HTMLElement;
const pauseBtn = document.getElementById("pause-btn") as HTMLElement;
const rowCount = document.getElementById("row") as HTMLElement;
const delayInput = document.getElementById("delay") as HTMLElement;
const pyramid = document.getElementById("pyramid") as HTMLElement;
const btnControls = document.querySelector(".btn-controls") as HTMLElement;
const changePatternBtn = document.getElementById('change-pattern') as HTMLElement;

let intervalId:null | number = null;
let isRunning = false;
let currentRowIndex = 0;
let rowIndex = 0;
let cellIndex = 0;
let currentPattern = 'topToBottom';
 if(submitBtn){
    
     submitBtn.addEventListener("click", () => {
        if(pyramid)
            pyramid.innerHTML = "";
       createPyramid();
     });
 }

const createPyramid = () => {
  for (let i = 0; i < Number((rowCount as HTMLInputElement).value); i++) {
    const pyramidRow = document.createElement("div");
    pyramidRow.classList.add("pyramid-row");
    const cellCount = 2 * i + 1;
    for (let j = 0; j < cellCount; j++) {
      const pyramidCell = document.createElement("div");
      pyramidCell.classList.add("pyramid-cell");
      pyramidRow.appendChild(pyramidCell);
    }
    if(pyramid)
     pyramid.appendChild(pyramidRow);
  }
  if(btnControls)
   btnControls.style.display = "flex";
};

const lightToptoBottom = () => {
    const rows = document.querySelectorAll('.pyramid-row');

    const lightRow = () => {
        document.querySelectorAll('.pyramid-cell').forEach(cell => cell.classList.remove('active'));

        const currentRow = rows[currentRowIndex];
        if (currentRow) {
            const cells = currentRow.querySelectorAll('.pyramid-cell');
            cells.forEach(cell => cell.classList.add('active'));
        }

        currentRowIndex = (currentRowIndex + 1) % rows.length;
    };

    lightRow();
     intervalId = setInterval(lightRow, Number((delayInput as HTMLInputElement).value));
    isRunning = true;
};

const lightTwoDirection = () => {
    const rows = document.querySelectorAll('.pyramid-row');
    let isToptoBottom = true;

    const lightRow = () => {
        document.querySelectorAll('.pyramid-cell').forEach(cell => cell.classList.remove('active'));

        const currentRow = rows[currentRowIndex];
        if (currentRow) {
            const cells = currentRow.querySelectorAll('.pyramid-cell');
            cells.forEach(cell => cell.classList.add('active'));
        }

        if (isToptoBottom) {
            currentRowIndex++;
            if (currentRowIndex >= rows.length) {
                isToptoBottom = false;
                currentRowIndex = rows.length - 1;
            }
        } else {
            currentRowIndex--;
            if (currentRowIndex < 0) {
                isToptoBottom = true;
                currentRowIndex = 0;
            }
        }
    };

    lightRow();
    intervalId = setInterval(lightRow, Number((delayInput as HTMLInputElement).value));
    isRunning = true;
};

const cellLightPattern = () => {
    const rows = document.querySelectorAll('.pyramid-row');
   
    const lightRow = () => {
        document.querySelectorAll('.pyramid-cell').forEach(cell => cell.classList.remove('active'));

        if (rowIndex < rows.length) {
            const currentRow = rows[rowIndex];
            const cells = currentRow.querySelectorAll('.pyramid-cell');
            if (cellIndex < cells.length) {
                cells[cellIndex].classList.add('active');
                cellIndex++;
            } else {
                cellIndex = 0;
                rowIndex++;
            }
        } else {
            rowIndex = 0;
        }
    };

    lightRow();
    intervalId = setInterval(lightRow, Number((delayInput as HTMLInputElement).value));
    isRunning = true;
};

const startPattern = () => {
    switch (currentPattern) {
        case 'topToBottom':
            lightToptoBottom();
            break;
        case 'twoDirection':
            lightTwoDirection();
            break;
        case 'cellLight':
            cellLightPattern();
            break;
        default:
            lightToptoBottom();
            break;
    }
};

if(startBtn)
startBtn.addEventListener("click", () => {
    if (!isRunning) {
        startPattern();
    }
});

if(pauseBtn)
pauseBtn.addEventListener("click", () => {
    console.log(currentRowIndex);

    if (isRunning) {
        if(isRunning && intervalId!==null){
            clearInterval(intervalId);
            intervalId = null;
            isRunning = false;
        }
    }
});

if(resumeBtn)
resumeBtn.addEventListener("click", () => {
    if (!isRunning && intervalId === null) {
        startPattern();
    }
});

if(stopBtn)
stopBtn.addEventListener("click", () => {
    if(intervalId !== null)
    clearInterval(intervalId);
    intervalId = null;
    isRunning = false;
    currentRowIndex = 0;
    rowIndex = 0;
    cellIndex = 0;
    document.querySelectorAll(".pyramid-cell").forEach(cell => cell.classList.remove("active"));
});

if(changePatternBtn)
changePatternBtn.addEventListener('click', () => {
    const patterns = ['topToBottom', 'twoDirection', 'cellLight'];
    const currentIndex = patterns.indexOf(currentPattern);
    const nextIndex = (currentIndex + 1) % patterns.length;
    currentPattern = patterns[nextIndex];
        if (isRunning && intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
        isRunning = false;
        startPattern();
    }
});
