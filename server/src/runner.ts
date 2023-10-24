import { SimplexSolver } from "./service/SimplexSolver";

// Crie uma instância do SimplexSolver
const solver = new SimplexSolver();

// Defina a função objetiva e restrições
const objectiveFunction = [-520, -450, 0, 0, 0]; // Exemplo de função objetiva: 2x1 + 3x2 + x3
const restriction1 = [40, 25, 1, 0, 400]; // Exemplo de restrição 1: x1 + x3 <= 1
const restriction2 = [24, 30, 0, 1, 360]; // Exemplo de restrição 2: 2x2 + 2x3 <= 3
// Adicione a função objetiva e as restrições à instância do SimplexSolver
solver.createObjetiveFunction(objectiveFunction);
solver.insertRestrictions(restriction1);
solver.insertRestrictions(restriction2);

console.log(solver.calculate());
