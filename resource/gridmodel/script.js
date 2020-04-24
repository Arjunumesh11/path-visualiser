const grid = document.querySelector(".gridContainer");
const resetButton = document.querySelector(".reset");
var arr = [];
var isdrawing = false;
var isdest = false;
var issource = false;
var source, destination;
createGrid = () => {
    for (let i = 0; i < 800; i++) {
        const div = document.createElement("div");
        div.classList.add("square");
        div.classList.add("cell" + i);
        grid.appendChild(div);
    }
};

updateGrid = () => {
    grid.innerHTML = "";
    grid.style.setProperty(
        "grid-template-columns",
        `repeat(${userInput.value}, 2fr)`
    );
    grid.style.setProperty(
        "grid-template-rows",
        `repeat(${userInput.value}, 2fr)`
    );
    for (let i = 0; i < userInput.value * userInput.value; i++) {
        const div = document.createElement("div");
        div.classList.add("square");
        grid.appendChild(div);
    }
    console.log(userInput.value);
};

const square = document.querySelector("div");
grid.addEventListener("mousedown", (e) => {
    if (!isdest) {
        isdest = true;
        event.target.classList.replace("square", "destination");
        destination = parseInt(event.target.classList[1].slice(4));
    }
    else if (!issource) {
        event.target.classList.replace("square", "source");
        source = parseInt(event.target.classList[1].slice(4));
        issource = true;
    }
    if (isdest && issource)
        isdrawing = true;
    e.preventDefault();
})
grid.addEventListener("mouseup", () => { isdrawing = false; })
square.addEventListener("mouseover", function (event) {
    if (isdrawing) {
        event.target.classList.replace("square", "color");
        arr.push(parseInt(event.target.classList[1].slice(4)))
        console.log(arr)
        console.log("dest " + destination);
        console.log("source " + source);
    }
});


resetButton.addEventListener("click", function () {
    issource = false;
    isdest = false;
    source = null;
    destination = null;
    grid.innerHTML = "";
    grid.style.setProperty("grid-template-columns", `repeat(40, 1fr)`);
    grid.style.setProperty("grid-template-rows", `repeat(20, 1fr)`);
    arr = [];
    createGrid();
});

createGrid();