export default class Graph {
    #matrizAdyacencia = [];
    #map = new Map();
    #listaAdyacencia = new Map();

    constructor() {}

    addVertices(...vertices) {
        for (let value of vertices) {
            if (!this.#map.has(value)) {
                this.#map.set(value, this.#matrizAdyacencia.length);
                this.#matrizAdyacencia.push(new Array(this.#matrizAdyacencia.length).fill(0));
                for (let i = 0; i < this.#matrizAdyacencia.length - 1; i++) {
                    this.#matrizAdyacencia[i].push(0);
                }
                this.#listaAdyacencia.set(value, []);
            }
        }
    }

    addV(value) {
        this.addVertices(value);
    }

    addConexion(start, end, weight = 1) {
        if (this.#map.has(start) && this.#map.has(end)) {
            this.#matrizAdyacencia[this.#map.get(start)][this.#map.get(end)] = weight;
            this.#listaAdyacencia.get(start).push({ vertex: end, weight: weight });
            return true;
        }
        return false;
    }

    bfs(callback) {
        if (this.#map.size === 0) return;

        let queue = [];
        let visited = new Array(this.#matrizAdyacencia.length).fill(false);
        let entries = [...this.#map.entries()];

        let [firstVertex] = entries[0];
        queue.push(firstVertex[0]);
        visited[this.#map.get(firstVertex[0])] = true;

        while (queue.length > 0) {
            let vertex = queue.shift();
            callback(vertex);

            for (let neighbor of this.#listaAdyacencia.get(vertex)) {
                if (!visited[this.#map.get(neighbor.vertex)]) {
                    visited[this.#map.get(neighbor.vertex)] = true;
                    queue.push(neighbor.vertex);
                }
            }
        }
    }

    dfs(callback) {
        if (this.#map.size === 0) return;

        let stack = [];
        let visited = new Array(this.#matrizAdyacencia.length).fill(false);
        let entries = [...this.#map.entries()];

        let [firstVertex] = entries[0];
        stack.push(firstVertex[0]);
        visited[this.#map.get(firstVertex[0])] = false;

        while (stack.length > 0) {
            let vertex = stack.pop();

            if (!visited[this.#map.get(vertex)]) {
                visited[this.#map.get(vertex)] = true;
                callback(vertex);
                
                for (let neighbor of this.#listaAdyacencia.get(vertex).reverse()) {
                    if (!visited[this.#map.get(neighbor.vertex)]) {
                        stack.push(neighbor.vertex);
                    }
                }
            }
        }
    }

    dijkstra(start) {
        const distances = {}; 
        const previous = {};  
        const vertices = Array.from(this.#map.keys());  
        const V = this.#map.size; 
        const L = new Array(V).fill(false); 
        const D = new Array(V).fill(Infinity); 

        vertices.forEach(vertex => {
            distances[vertex] = Infinity;  
            previous[vertex] = null; 
        });
        distances[start] = 0;  


        D[this.#map.get(start)] = 0;


        for (let count = 0; count < V - 1; count++) {
            let u = this.minDistance(D, L); 
            L[u] = true;  

            vertices.forEach(vertex => {
                let v = this.#map.get(vertex);
                let weight = this.#matrizAdyacencia[u][v];

                if (!L[v] && weight && D[u] !== Infinity && D[u] + weight < D[v]) {
                    D[v] = D[u] + weight;
                    distances[vertex] = D[v];
                    previous[vertex] = vertices[u];
                }
            });
        }

        // Construir rutas más cortas
        const paths = {};
        vertices.forEach(vertex => {
            let path = [];
            let u = vertex;
            while (previous[u]) {
                path.unshift(u);
                u = previous[u];
            }
            path.unshift(start);
            paths[vertex] = path;
        });

        return { distances, paths };
    }

    // Encontrar el vértice con distancia mínima
    minDistance(D, L) {
        let min = Infinity;
        let minIndex = -1;

        for (let v = 0; v < D.length; v++) {
            if (!L[v] && D[v] <= min) {
                min = D[v];
                minIndex = v;
            }
        }

        return minIndex;
    }

    // Obtener todas las rutas más cortas desde 'start'
    getAllShortestPaths(start) {
        return this.dijkstra(start);
    }

    getVertices() {
        return [...this.#map.entries()];
    }
}
