import { SimplexSolverService } from "../../../src/service/SimplexSolverService";
import { InvalidDataException } from "../../../src/shared/exceptions/InvalidDataException";

describe('Test get row by index', () => {

    it('Verify index then return', async () => {
        const simplexSolverService = new SimplexSolverService();

        simplexSolverService.insertObjetiveFunction([-3, -5, 0, 0, 0, 0]);

        simplexSolverService.insertConstraint([1, 0, 1, 0, 0, 4]);
        simplexSolverService.insertConstraint([0, 2, 0, 1, 0, 12]);
        simplexSolverService.insertConstraint([2, 3, 0, 0, 1, 21]);

        const row1 = simplexSolverService.getRowByIndex(0);

        const row3 = simplexSolverService.getRowByIndex(3);

        expect(row1).toEqual([-3, -5, 0, 0, 0, 0]);
        expect(row3).toEqual([2, 3, 0, 0, 1, 21]);
    })



    it('The return throw by invalid index row', async () => {
        const simplexSolverService = new SimplexSolverService();

        simplexSolverService.insertObjetiveFunction([-3, -5, 0, 0, 0, 0]);

        simplexSolverService.insertConstraint([1, 0, 1, 0, 0, 4]);
        simplexSolverService.insertConstraint([0, 2, 0, 1, 0, 12]);
        simplexSolverService.insertConstraint([2, 3, 0, 0, 1, 21]);

        expect(() => simplexSolverService.getRowByIndex(10)).toThrow(
            new InvalidDataException('The row index not found.'),
        );

        expect(() => simplexSolverService.getRowByIndex(-1)).toThrow(
            new InvalidDataException('The row index not found.'),
        );
    })

});
