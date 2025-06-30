class Graph {
    constructor(vertices) {
        this.vertices = vertices;
        this.adjList = new Map();
    }

    addVertex(v) {
        this.adjList.set(v, []);
    }

    addEdge(v, w) {
        this.adjList.get(v).push(w);
        this.adjList.get(w).push(v);
    }

    // Utility function used to check for cycle using DFS

    hasCycleUtil(v, visited, parent) {
        visited[v] = true;
        for (let i of this.adjList.get(v)) {
            if (!visited[i]) {
                if (this.hasCycleUtil(i, visited, v)) {
                    return true;
                }
            } else if (i !== parent) {
                return true;
            }
        }
        return false;
    }

    // This finds the Cycle in Graph
    detectCycle() {
        let visited = Array(this.vertices).fill(false);
        for (let i = 0; i < this.vertices; i++) {
            if (!visited[i]) {
                if (this.hasCycleUtil(i, visited, -1)) {
                    return true;
                }
            }
        }
        return false;
    }

    // Utility function for DFS traversal
    DFSUtil(v, visited) {
        visited[v] = true;
        for (let i of this.adjList.get(v)) {
            if (!visited[i]) {
                this.DFSUtil(i, visited);
            }
        }
    }

    // Function to find connected components
    findConnectedComponents() {
        let visited = Array(this.vertices).fill(false);
        let components = 0;
        for (let i = 0; i < this.vertices; i++) {
            if (!visited[i]) {
                this.DFSUtil(i, visited);
                components++;
            }
        }
        return components;
    }
    degreeOfNode(v) {
        if (this.adjList.has(v)) {
            return this.adjList.get(v).length;
        }
        return 0;
    }
}

// Let see this example usage for new graph

const g = new Graph(5);
g.addVertex(0);
g.addVertex(1);
g.addVertex(2);
g.addVertex(3);
g.addVertex(4);

g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(1, 3);
g.addEdge(3, 4);

console.log("Cycle detected:", g.detectCycle());
console.log("Connected Components:", g.findConnectedComponents());
console.log("Degree of node 1:", g.degreeOfNode(1)); 
