import { PriorityQueue } from './priorityqueue.js'
const grid = document.querySelector(".gridContainer");
const resetButton = document.querySelector(".reset");
const submitButton = document.querySelector(".calculate");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var arr = [];
var isobstacle = Array(800).fill(false);
var isdrawing = false;
var isdest = false;
var issource = false;
var source, destination;

const createGrid = () => {
    for (let i = 0; i < 800; i++) {
        const div = document.createElement("div");
        // const text = document.createTextNode(i)
        // div.appendChild(text);
        div.classList.add("square");
        div.classList.add("cell" + i);
        grid.appendChild(div);
    }
};
class node {
    constructor(adjacent) {
        this.adjacent = adjacent;
        this.isvisted = false;
        this.isdiscoverd = false;
        this.parent;
    }
}

function create_gridmap(obstacle, size, rows, columns) {

    var Grid_map = [];
    var connected_nodes = [];
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            connected_nodes = [];
            if ((i - 1) >= 0) {
                if (!isobstacle[i * columns + j - columns])
                    connected_nodes.push({ node: i * columns + j - columns, distance: 1 });
            }
            if ((i + 1) < rows) {
                if (!isobstacle[i * columns + j + columns])
                    connected_nodes.push({ node: i * columns + j + columns, distance: 1 });
            } if ((j - 1) >= 0) {
                if (!isobstacle[i * columns + j - 1])
                    connected_nodes.push({ node: i * columns + j - 1, distance: 1 });
            }
            if ((j + 1) < columns) {
                if (!isobstacle[i * columns + j + 1])
                    connected_nodes.push({ node: i * columns + j + 1, distance: 1 });
            }
            Grid_map.push(new node(connected_nodes))
        }
    }
    return Grid_map;
}

async function dijkstra(graph, start, end, size) {
    // console.log(start + " " + end);
    var queue = new PriorityQueue(size);
    var distance = [];
    for (var i = 0; i < size; i++) {
        distance.push(Infinity);
    }
    distance[start] = 0;
    //console.log(graph[start]);
    graph[start].isdiscoverd = true;
    queue.enqueue(start, distance[start]);
    var color1 = 255;
    var color2 = 255;
    var flag = 0;

    while (!queue.isEmpty() && !graph[end].isvisted) {
        await sleep(10);
        if (flag % 10 == 0) {
            if (color1 > 0)
                color1 = color1 - 5;
        }
        if (flag % 20 == 0) {
            if (color2 > 0)
                color2 = color2 - 20;
        }
        flag++;
        //console.log("col" + color)
        var temp = queue.display();
        // for (let k = 0; k < temp.length; k++)
        //     console.log(temp[k].data);
        // console.log("end")
        let currentnode = queue.dequeue().data;
        if (!graph[currentnode].isvisted) {
            //  console.log(currentnode);
            let adj = graph[currentnode].adjacent;
            for (var j = 0; j < adj.length; j++) {
                if (graph[adj[j].node].isvisted == false) {
                    if (distance[adj[j].node] > (distance[currentnode] + adj[j].distance)) {
                        var x = document.getElementsByClassName("cell" + adj[j].node);
                        x[0].style.backgroundColor = "rgb(0, " + color1.toString() + "," + color2.toString() + ")"
                        distance[adj[j].node] = distance[currentnode] + adj[j].distance
                        graph[adj[j].node].isdiscoverd == true;
                        graph[adj[j].node].parent = currentnode;
                        queue.enqueue(adj[j].node, distance[adj[j].node])
                    }
                }
            }
            graph[currentnode].isvisted = true;
        }

    }
    return distance
}
const square = document.querySelector("div");

grid.addEventListener("mousedown", (e) => {

    if (!issource) {
        event.target.classList.replace("square", "source");
        source = parseInt(event.target.classList[1].slice(4));
        issource = true;
    }
    else if (!isdest) {
        isdest = true;
        event.target.classList.replace("square", "destination");
        destination = parseInt(event.target.classList[1].slice(4));
    }
    if (isdest && issource)
        isdrawing = true;
    e.preventDefault();
})

grid.addEventListener("mouseup", () => { isdrawing = false; })

square.addEventListener("mouseover", function (event) {
    if (isdrawing) {
        event.target.classList.replace("square", "color");
        let a = parseInt(event.target.classList[1].slice(4));
        if (!isobstacle[a]) {
            arr.push(a)
            isobstacle[a] = true;
            console.log(arr)
            console.log("dest " + destination);
            console.log("source " + source);
            console.log("df" + asd);
        }

    }
});


resetButton.addEventListener("click", function () {
    issource = false;
    isobstacle.fill(false);
    isdest = false;
    source = null;
    destination = null;
    grid.innerHTML = "";
    grid.style.setProperty("grid-template-columns", `repeat(40, 1fr)`);
    grid.style.setProperty("grid-template-rows", `repeat(20, 1fr)`);
    arr = [];
    createGrid();
});
submitButton.addEventListener("click", async function () {
    if (issource && isdest) {
        var Grid_map = create_gridmap(0, 800, 20, 40);
        // console.log(Grid_map)
        // console.log("source = " + source + "  destination = " + destination);
        await dijkstra(Grid_map, source, destination, 800);
        let i = Grid_map[destination].parent;
        //console.log("done")
        while (i != source) {
            var x = document.getElementsByClassName("cell" + i);
            i = Grid_map[i].parent;
            // console.log(i);
            x[0].style.backgroundColor = "blue";
        }
    }
    else {
        alert("add source and destination")
    }
})
createGrid();