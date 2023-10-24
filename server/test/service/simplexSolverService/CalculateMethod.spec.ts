import { SimplexSolverService } from "../../../src/service/SimplexSolverService";

describe('Test calculate mathod', () => {

    it('Verify results', async () => {
        const simplexSolverService = new SimplexSolverService();

        simplexSolverService.insertObjetiveFunction([-3, -5, 0, 0, 0, 0]);

        simplexSolverService.insertConstraint([1, 0, 1, 0, 0, 4]);
        simplexSolverService.insertConstraint([0, 2, 0, 1, 0, 12]);
        simplexSolverService.insertConstraint([2, 3, 0, 0, 1, 21]);

        const result = simplexSolverService.calculate();

        expect(result).toEqual([['X2', 6], ['X1', 1.5], ['Z', 34.5]]);

    })

});
