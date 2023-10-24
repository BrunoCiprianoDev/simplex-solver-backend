import { SimplexSolverService } from "../../../src/service/SimplexSolverService";

describe('Test update rows method', () => {

    it('Verify new pivot row', async () => {
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

        const resultMatrix = simplexSolverService.matrix;

        expect(resultMatrix[0]).toEqual([-3, 0, 0, 2.5, 0, 30]);
        expect(resultMatrix[1]).toEqual([1, 0, 1, 0, 0, 4]);
        expect(resultMatrix[2]).toEqual([0, 1, 0, 0.5, 0, 6]);
        expect(resultMatrix[3]).toEqual([2, 0, 0, -1.5, 1, 3]);


    })

});
