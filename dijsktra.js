class PriorityQueue {
    constructor(maxSize) {
        // Set default max size if not provided
        if (isNaN(maxSize)) {
            maxSize = 10;
        }
        this.maxSize = maxSize;
        // Init an array that'll contain the queue values.
        this.container = [];
    }
    // Helper function to display all values while developing
    display() {
        console.log(this.container);
    }
    // Checks if queue is empty
    isEmpty() {
        return this.container.length === 0;
    }
    // checks if queue is full
    isFull() {
        return this.container.length >= this.maxSize;
    }
    enqueue(data, priority) {
        // Check if Queue is full
        if (this.isFull()) {
            console.log("Queue Overflow!");
            return;
        }
        let currElem = new this.Element(data, priority);
        let addedFlag = false;
        // Since we want to add elements to end, we'll just push them.
        for (let i = 0; i < this.container.length; i++) {
            if (currElem.priority < this.container[i].priority) {
                this.container.splice(i, 0, currElem);
                addedFlag = true; break;
            }
        }
        if (!addedFlag) {
            this.container.push(currElem);
        }
    }
    dequeue() {
        // Check if empty
        if (this.isEmpty()) {
            console.log("Queue Underflow!");
            return;
        }
        return this.container.shift();
    }
    peek() {
        if (isEmpty()) {
            console.log("Queue Underflow!");
            return;
        }
        return this.container[this.container.length - 1];
    }
    clear() {
        this.container = [];
    }
}
// Create an inner class that we'll use to create new nodes in the queue
// Each element has some data and a priority
PriorityQueue.prototype.Element = class {
    constructor(data, priority) {
        this.data = data;
        this.priority = priority;
    }
};



queue = new PriorityQueue;
const size = 16;
class node {
    constructor(adjacent) {

        this.adjacent = adjacent;
        this.isvisted = false;
        this.isdiscoverd = false;
        this.parent;
    }

}


Grid_map = new Array(16);
var connected_nodes = [];
for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
        connected_nodes = [];
        if ((i - 1) >= 0) {
            connected_nodes.push({ node: i * 4 + j - 4, distance: 1 });
        }
        if ((i + 1) < 4) {
            connected_nodes.push({ node: i * 4 + j + 4, distance: 1 });
        } if ((j - 1) >= 0) {
            connected_nodes.push({ node: i * 4 + j - 1, distance: 1 });
        }
        if ((j + 1) < 4) {
            connected_nodes.push({ node: i * 4 + j + 1, distance: 1 });
        }
        Grid_map[i * 4 + j] = new node(connected_nodes)
    }
}


function dijkstra(graph, start, end) {
    distance = new Array(size);
    for (var i = 0; i < size; i++) {
        distance[i] = Infinity;
    }
    distance[start] = 0;
    graph[start].isdiscoverd = true;
    queue.enqueue(start, distance[start]);
    while (!graph[end].isvisted) {
        if (!queue.isEmpty()) {
            currentnode = queue.dequeue().data;
            adj = graph[currentnode].adjacent;
            for (var j = 0; j < adj.length; j++) {
                if (graph[adj[j].node].isvisted == false) {
                    if (distance[adj[j].node] > (distance[currentnode] + adj[j].distance)) {
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
dijkstra(grid, 0, 15)
var a = 15;
while (a != 0) {
    console.log(grid[a].parent);
    a = grid[a].parent
}