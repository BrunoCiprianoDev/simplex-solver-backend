import { SimplexSolverService } from "../../../src/service/SimplexSolverService";

describe('Update pivot row', () => {

    it('Verify new pivot row', async () => {
        const simplexSolverService = new SimplexSolverService();

        simplexSolverService.insertObjetiveFunction([-3, -5, 0, 0, 0, 0]);

        simplexSolverService.insertConstraint([1, 0, 1, 0, 0, 4]);
        simplexSolverService.insertConstraint([0, 2, 0, 1, 0, 12]);
        simplexSolverService.insertConstraint([2, 3, 0, 0, 1, 21]);

        simplexSolverService.initListVariables();

        const entryColumnIndex = simplexSolverService.getIndexEntryColumn();
        const pivotLineIndex = simplexSolverService.getIndexPivotRow(entryColumnIndex);

        const pivotRow = simplexSolverService.getRowByIndex(pivotLineIndex);

        simplexSolverService.updatePivotRow(entryColumnIndex, pivotLineIndex);


        expect(pivotRow).toEqual([0, 2, 0, 1, 0, 12]);
        expect(simplexSolverService.matrix[pivotLineIndex]).toEqual([0, 1, 0, 0.5, 0, 6]);


    })

});
