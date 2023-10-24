import { SimplexSolver } from "./service/SimplexSolver";

// Crie uma instância do SimplexSolver
const solver = new SimplexSolver();

// Defina a função objetiva e restrições
const objectiveFunction = [-100, -80, -120, -30, 0, 0, 0, 0]; // Exemplo de função objetiva: 2x1 + 3x2 + x3
const restriction1 = [1, 1, 1, 4, 1, 0, 0, 300]; // Exemplo de restrição 1: x1 + x3 <= 1
const restriction2 = [0, 1, 1, 2, 0, 1, 0, 600]; // Exemplo de restrição 2: 2x2 + 2x3 <= 3
const restriction3 = [3, 2, 4, 0, 0, 0, 1, 500];

// Adicione a função objetiva e as restrições à instância do SimplexSolver
solver.createObjetiveFunction(objectiveFunction);
solver.insertRestrictions(restriction1);
solver.insertRestrictions(restriction2);
solver.insertRestrictions(restriction3);

solver.createListVariables(4);
solver.calculate();

solver.printTable();
solver.getResults();