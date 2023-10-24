import { SimplexSolverService } from "../../../src/service/SimplexSolverService";

describe('Test index pivot line', () => {

    it('Verify index returned', async () => {
        const simplexSolverService = new SimplexSolverService();

        simplexSolverService.insertObjetiveFunction([-3, -5, 0, 0, 0, 0]);

        simplexSolverService.insertConstraint([1, 0, 1, 0, 0, 4]);
        simplexSolverService.insertConstraint([0, 2, 0, 1, 0, 12]);
        simplexSolverService.insertConstraint([2, 3, 0, 0, 1, 21]);

        simplexSolverService.initListVariables();

        const entryColumn = simplexSolverService.getIndexEntryColumn();
        const pivotLine = simplexSolverService.getIndexPivotRow(entryColumn);

        expect(pivotLine).toEqual(2);
    })

});
