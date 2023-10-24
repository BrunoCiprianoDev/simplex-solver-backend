import { SimplexSolverService } from "../../../src/service/SimplexSolverService";
import { InvalidDataException } from "../../../src/shared/exceptions/InvalidDataException";

describe('Test get column by index', () => {

    it('Verify index then return', async () => {
        const simplexSolverService = new SimplexSolverService();

        simplexSolverService.insertObjetiveFunction([-3, -5, 0, 0, 0, 0]);

        simplexSolverService.insertConstraint([1, 0, 1, 0, 0, 4]);
        simplexSolverService.insertConstraint([0, 2, 0, 1, 0, 12]);
        simplexSolverService.insertConstraint([2, 3, 0, 0, 1, 21]);

        const column3 = simplexSolverService.getColumnByIndex(2);
        const column2 = simplexSolverService.getColumnByIndex(1);

        expect(column2).toEqual([-5, 0, 2, 3]);
        expect(column3).toEqual([0, 1, 0, 0]);
    })



    it('The return throw by invalid index column', async () => {
        const simplexSolverService = new SimplexSolverService();

        simplexSolverService.insertObjetiveFunction([-3, -5, 0, 0, 0, 0]);

        simplexSolverService.insertConstraint([1, 0, 1, 0, 0, 4]);
        simplexSolverService.insertConstraint([0, 2, 0, 1, 0, 12]);
        simplexSolverService.insertConstraint([2, 3, 0, 0, 1, 21]);

        expect(() => simplexSolverService.getColumnByIndex(10)).toThrow(
            new InvalidDataException('The column index not found.'),
        );

        expect(() => simplexSolverService.getColumnByIndex(-1)).toThrow(
            new InvalidDataException('The column index not found.'),
        );
    })

});
