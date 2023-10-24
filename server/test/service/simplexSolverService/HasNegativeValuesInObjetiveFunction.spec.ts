import { SimplexSolverService } from "../../../src/service/SimplexSolverService";

describe('Test has negative values in objetive function', () => {

    it('Verify response method', async () => {
        const simplexSolverService = new SimplexSolverService();

        simplexSolverService.insertObjetiveFunction([-3, -5, 0, 0, 0, 0]);

        simplexSolverService.insertConstraint([1, 0, 1, 0, 0, 4]);
        simplexSolverService.insertConstraint([0, 2, 0, 1, 0, 12]);
        simplexSolverService.insertConstraint([2, 3, 0, 0, 1, 21]);

        simplexSolverService.initListVariables();

        const entryColumnIndex = simplexSolverService.getIndexEntryColumn();
        const pivotLineIndex = simplexSolverService.getIndexPivotRow(entryColumnIndex);

        simplexSolverService.updatePivotRow(entryColumnIndex, pivotLineIndex);

        simplexSolverService.updateRows(entryColumnIndex, pivotLineIndex);

        const response = simplexSolverService.hasNegativeValuesInObjectiveFunction();
        expect(response).toEqual(true);


    })

});
