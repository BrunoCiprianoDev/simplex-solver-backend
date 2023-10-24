//import { SimplexSolver } from "./service/SimplexSolver";
import { SimplexSolverService } from "./service/SimplexSolverService";
const simplexSolverService = new SimplexSolverService();

simplexSolverService.insertObjetiveFunction([-3, -5, 0, 0, 0, 0]);

simplexSolverService.insertConstraint([1, 0, 1, 0, 0, 4]);
simplexSolverService.insertConstraint([0, 2, 0, 1, 0, 12]);
simplexSolverService.insertConstraint([2, 3, 0, 0, 1, 21]);

const result = simplexSolverService.calculate();

console.log(result);

