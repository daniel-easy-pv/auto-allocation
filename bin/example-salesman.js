// // import { Graph, Embedding } from '@mlarocca/jsgraphs';
// const mlarocca = require('../utils/jsgraphs-master/src/graph/graph.mjs');

// // const jsg = require('@mlarocca/jsgraphs');
// const salesman = require('../anneal/path');

// const points = [
//     new salesman.Point(0, 0),
//     new salesman.Point(1, 1),
//     new salesman.Point(1, 0),
//     new salesman.Point(0, 1),
// ];
// const solution = salesman.solve(points);
// const orderedPoints = solution.map((i) => points[i]);
// console.log(orderedPoints);

// const g = new mlarocca.Graph();
// const v = g.createVertex('v', { weight: 1.5 });
// const u = g.createVertex('u', { weight: 1.5 });

// const e = g.createEdge(u, v);

// const embedding = Embedding.forGraph(g);
// embedding.toSvg(700, 550, {
//     graphCss: ['FSA'], // This class is added to the whole graph, can be used as a selector
//     verticesCss: { [u]: ['source'], [v]: ['dest', 'error'] },
//     edgesCss: { [e]: ['test1', 'test2'] },
//     drawEdgesAsArcs: true, // Display edges as curves or segments
//     displayEdgesLabel: false, //  No label added to edges
//     displayEdgesWeight: false, // Weights are not displayed either
// });
