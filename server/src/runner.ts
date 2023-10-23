import { SimplexSolver } from "./service/SimplexSolver";

// Crie uma instância do SimplexSolver
const solver = new SimplexSolver();

// Defina a função objetiva e restrições
const objectiveFunction = [-3, -5, 0, 0, 0, 0]; // Exemplo de função objetiva: 2x1 + 3x2 + x3
const restriction1 = [1, 0, 1, 0, 0, 4]; // Exemplo de restrição 1: x1 + x3 <= 1
const restriction2 = [0, 2, 0, 1, 0, 12]; // Exemplo de restrição 2: 2x2 + 2x3 <= 3
const restriction3 = [2, 3, 0, 0, 1, 21];

// Adicione a função objetiva e as restrições à instância do SimplexSolver
solver.createObjetiveFunction(objectiveFunction);
solver.insertRestrictions(restriction1);
solver.insertRestrictions(restriction2);
solver.insertRestrictions(restriction3);


// const indexEntryColumn = solver.getIndexEntryColumn();
// const indexPivotLine = solver.getPivotLine(indexEntryColumn);
// let pivotLine = solver.getLineByIndex(indexPivotLine);
// pivotLine = solver.calculateNewPivotLine(indexEntryColumn, pivotLine);

// const updatedLine = solver.updateLine([-3, -5, 0, 0, 0, 0], indexEntryColumn, pivotLine);
//console.log(updatedLine);
//line: number[], entryColumn: number, pivotLine: number[]

solver.calculate();