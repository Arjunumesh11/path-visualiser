const grid = document.querySelector(".gridContainer");
const resetButton = document.querySelector(".reset");
var isdrawing = false;
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
grid.addEventListener("mousedown", () => { isdrawing = true; })
grid.addEventListener("mouseup", () => { isdrawing = false; })
square.addEventListener("mouseover", function (event) {
    if (isdrawing) {
        event.target.classList.replace("square", "color");
        console.log(parseInt(event.target.classList[1].slice(4)))
    }
});


resetButton.addEventListener("click", function () {
    grid.innerHTML = "";
    grid.style.setProperty("grid-template-columns", `repeat(40, 1fr)`);
    grid.style.setProperty("grid-template-rows", `repeat(20, 1fr)`);
    createGrid();
});

createGrid();