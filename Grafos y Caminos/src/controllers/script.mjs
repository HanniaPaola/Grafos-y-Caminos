import Graph from "../models/Graph.mjs";

const g = new Graph();
const output = document.getElementById('output');

document.getElementById('addVertex').addEventListener('click', () => {
    const vertex = document.getElementById('vertex').value.trim();
    if (vertex) {
        g.addV(vertex);
        document.getElementById('vertex').value = '';
        const message = `Vértice añadido: ${vertex}`;
        output.innerHTML = message;
        console.log(message);
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: message,
            confirmButtonColor: '#8C0303'
        });
    } else {
        const message = 'El nombre del vértice no puede estar vacío';
        output.innerHTML = message;
        console.log(message);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message,
            confirmButtonColor: '#8C0303'
        });
    }
});

document.getElementById('addEdge').addEventListener('click', () => {
    const start = document.getElementById('startVertex').value.trim();
    const end = document.getElementById('endVertex').value.trim();
    const weight = parseInt(document.getElementById('weight').value, 10);
    if (start && end && !isNaN(weight)) {
        const result = g.addConexion(start, end, weight);
        document.getElementById('startVertex').value = '';
        document.getElementById('endVertex').value = '';
        document.getElementById('weight').value = '1';
        const message = result ? `Arista añadida de ${start} a ${end} con peso ${weight}` : `No se pudo añadir la arista`;
        output.innerHTML = message;
        console.log(message);
        Swal.fire({
            icon: result ? 'success' : 'error',
            title: result ? 'Éxito' : 'Error',
            text: message,
            confirmButtonColor: '#8C0303'
        });
    } else {
        const message = 'Por favor, proporcione un vértice de inicio, un vértice final y un peso válidos';
        output.innerHTML = message;
        console.log(message);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message,
            confirmButtonColor: '#8C0303'
        });
    }
});

document.getElementById('bfs').addEventListener('click', () => {
    let message = 'Recorrido BFS: ';
    console.log(message);
    g.bfs((val) => {
        message += `${val} `;
        console.log(val);
    });
    output.innerHTML = message;
    Swal.fire({
        icon: 'info',
        title: 'Recorrido BFS',
        text: message,
        confirmButtonColor: '#8C0303'
    });
});

document.getElementById('dfs').addEventListener('click', () => {
    let message = 'Recorrido DFS: ';
    console.log(message);
    g.dfs((val) => {
        message += `${val} `;
        console.log(val);
    });
    output.innerHTML = message;
    Swal.fire({
        icon: 'info',
        title: 'Recorrido DFS',
        text: message,
        confirmButtonColor: '#8C0303'
    });
});

document.getElementById('dijkstra').addEventListener('click', () => {
    const start = document.getElementById('startVertex').value.trim();
    if (start && g.getVertices().map(([v]) => v).includes(start)) {
        const { distances, paths } = g.getAllShortestPaths(start);
        let message = `Algoritmo de Dijkstra desde ${start}: <br>`;
        console.log(`Algoritmo de Dijkstra desde ${start}:`);
        for (let [vertex, _] of g.getVertices()) {
            const distMessage = `Vértice ${vertex} - Distancia: ${distances[vertex]}, Ruta: ${paths[vertex].join(' -> ')}`;
            message += `${distMessage} <br>`;
            console.log(distMessage);
        }
        output.innerHTML = message;
        Swal.fire({
            icon: 'info',
            title: 'Resultado de Dijkstra',
            html: message,
            confirmButtonColor: '#8C0303'
        });
    } else {
        const message = 'Por favor, introduzca un vértice de inicio válido para el algoritmo de Dijkstra';
        output.innerHTML = message;
        console.log(message);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message,
            confirmButtonColor: '#8C0303'
        });
    }
});
