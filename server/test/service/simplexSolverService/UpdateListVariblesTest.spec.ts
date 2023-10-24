import { SimplexSolverService } from "../../../src/service/SimplexSolverService";

describe('Test update list variables method', () => {

    it('Verify change value in array verticalVariables', async () => {
        const simplexSolverService = new SimplexSolverService();

        simplexSolverService.insertObjetiveFunction([-3, -5, 0, 0, 0, 0]);

        simplexSolverService.insertConstraint([1, 0, 1, 0, 0, 4]);
        simplexSolverService.insertConstraint([0, 2, 0, 1, 0, 12]);
        simplexSolverService.insertConstraint([2, 3, 0, 0, 1, 21]);

        simplexSolverService.initListVariables();

        const horizontalVariables = simplexSolverService.horizontalVariables;
        const verticalVariables = simplexSolverService.verticalVariables;

        expect(horizontalVariables).toEqual(["X1", "X2", "F1", "F2", "F3", "P"]);
        expect(verticalVariables).toEqual(["Z", "F1", "F2", "F3"]);

        simplexSolverService.updateListVariables(1, 2);

        expect(horizontalVariables).toEqual(["X1", "X2", "F1", "F2", "F3", "P"]);
        expect(verticalVariables).toEqual(["Z", "F1", "X2", "F3"]);

    })


});
