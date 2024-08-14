var submitBtn = document.querySelector(".submit-btn");
var startBtn = document.getElementById("start-btn");
var stopBtn = document.getElementById("stop-btn");
var resumeBtn = document.getElementById("resume-btn");
var pauseBtn = document.getElementById("pause-btn");
var rowCount = document.getElementById("row");
var delayInput = document.getElementById("delay");
var pyramid = document.getElementById("pyramid");
var btnControls = document.querySelector(".btn-controls");
var changePatternBtn = document.getElementById('change-pattern');
var intervalId = null;
var isRunning = false;
var currentRowIndex = 0;
var rowIndex = 0;
var cellIndex = 0;
var currentPattern = 'topToBottom';
if (submitBtn) {
    submitBtn.addEventListener("click", function () {
        if (pyramid)
            pyramid.innerHTML = "";
        createPyramid();
    });
}
var createPyramid = function () {
    for (var i = 0; i < Number(rowCount.value); i++) {
        var pyramidRow = document.createElement("div");
        pyramidRow.classList.add("pyramid-row");
        var cellCount = 2 * i + 1;
        for (var j = 0; j < cellCount; j++) {
            var pyramidCell = document.createElement("div");
            pyramidCell.classList.add("pyramid-cell");
            pyramidRow.appendChild(pyramidCell);
        }
        if (pyramid)
            pyramid.appendChild(pyramidRow);
    }
    if (btnControls)
        btnControls.style.display = "flex";
};
var lightToptoBottom = function () {
    var rows = document.querySelectorAll('.pyramid-row');
    var lightRow = function () {
        document.querySelectorAll('.pyramid-cell').forEach(function (cell) { return cell.classList.remove('active'); });
        var currentRow = rows[currentRowIndex];
        if (currentRow) {
            var cells = currentRow.querySelectorAll('.pyramid-cell');
            cells.forEach(function (cell) { return cell.classList.add('active'); });
        }
        currentRowIndex = (currentRowIndex + 1) % rows.length;
    };
    lightRow();
    intervalId = setInterval(lightRow, Number(delayInput.value));
    isRunning = true;
};
var lightTwoDirection = function () {
    var rows = document.querySelectorAll('.pyramid-row');
    var isToptoBottom = true;
    var lightRow = function () {
        document.querySelectorAll('.pyramid-cell').forEach(function (cell) { return cell.classList.remove('active'); });
        var currentRow = rows[currentRowIndex];
        if (currentRow) {
            var cells = currentRow.querySelectorAll('.pyramid-cell');
            cells.forEach(function (cell) { return cell.classList.add('active'); });
        }
        if (isToptoBottom) {
            currentRowIndex++;
            if (currentRowIndex >= rows.length) {
                isToptoBottom = false;
                currentRowIndex = rows.length - 1;
            }
        }
        else {
            currentRowIndex--;
            if (currentRowIndex < 0) {
                isToptoBottom = true;
                currentRowIndex = 0;
            }
        }
    };
    lightRow();
    intervalId = setInterval(lightRow, Number(delayInput.value));
    isRunning = true;
};
var cellLightPattern = function () {
    var rows = document.querySelectorAll('.pyramid-row');
    var lightRow = function () {
        document.querySelectorAll('.pyramid-cell').forEach(function (cell) { return cell.classList.remove('active'); });
        if (rowIndex < rows.length) {
            var currentRow = rows[rowIndex];
            var cells = currentRow.querySelectorAll('.pyramid-cell');
            if (cellIndex < cells.length) {
                cells[cellIndex].classList.add('active');
                cellIndex++;
            }
            else {
                cellIndex = 0;
                rowIndex++;
            }
        }
        else {
            rowIndex = 0;
        }
    };
    lightRow();
    intervalId = setInterval(lightRow, Number(delayInput.value));
    isRunning = true;
};
var startPattern = function () {
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
if (startBtn)
    startBtn.addEventListener("click", function () {
        if (!isRunning) {
            startPattern();
        }
    });
if (pauseBtn)
    pauseBtn.addEventListener("click", function () {
        console.log(currentRowIndex);
        if (isRunning) {
            if (isRunning && intervalId !== null) {
                clearInterval(intervalId);
                intervalId = null;
                isRunning = false;
            }
        }
    });
if (resumeBtn)
    resumeBtn.addEventListener("click", function () {
        if (!isRunning && intervalId === null) {
            startPattern();
        }
    });
if (stopBtn)
    stopBtn.addEventListener("click", function () {
        if (intervalId !== null)
            clearInterval(intervalId);
        intervalId = null;
        isRunning = false;
        currentRowIndex = 0;
        rowIndex = 0;
        cellIndex = 0;
        document.querySelectorAll(".pyramid-cell").forEach(function (cell) { return cell.classList.remove("active"); });
    });
if (changePatternBtn)
    changePatternBtn.addEventListener('click', function () {
        var patterns = ['topToBottom', 'twoDirection', 'cellLight'];
        var currentIndex = patterns.indexOf(currentPattern);
        var nextIndex = (currentIndex + 1) % patterns.length;
        currentPattern = patterns[nextIndex];
        if (isRunning && intervalId !== null) {
            clearInterval(intervalId);
            intervalId = null;
            isRunning = false;
            startPattern();
        }
    });
