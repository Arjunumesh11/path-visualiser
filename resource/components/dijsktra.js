priorityqueue = require('./priorityqueue');
queue = new priorityqueue;
const size = 10;
class node {
    constructor(adjacent) {

        this.adjacent = adjacent;
        this.isvisted = false;
        this.isdiscoverd = false;
        this.parent;
    }

}
graph = new Array(5);
graph[0] = new node([{ node: 1, distance: 1 }, { node: 2, distance: 2 }, { node: 3, distance: 2 }]);
graph[1] = new node([{ node: 0, distance: 1 }, { node: 3, distance: 2 }, { node: 4, distance: 10 }]);
graph[2] = new node([{ node: 0, distance: 2 }, { node: 4, distance: 5 }]);
graph[3] = new node([{ node: 0, distance: 2 }, { node: 1, distance: 2 }, { node: 4, distance: 3 }]);
graph[4] = new node([{ node: 1, distance: 10 }, { node: 2, distance: 5 }, { node: 3, distance: 3 }]);

function dijkstra(graph, start, end) {
    distance = new Array(10);
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
                        queue.enqueue(adj[j].node, distance[adj[j].node])
                    }
                }
            }
            graph[currentnode].isvisted = true;
        }
    }
    return distance
}
console.log(dijkstra(graph, 0, 1))