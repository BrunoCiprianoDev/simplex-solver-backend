import { SimplexSolverService } from "../../../src/service/SimplexSolverService";
import { InvalidDataException } from "../../../src/shared/exceptions/InvalidDataException";

describe('Test method insert constraint', () => {


    it('Verify operation insertConstraint', async () => {
        const simplexSolverService = new SimplexSolverService();

        simplexSolverService.insertObjetiveFunction([1, 1, 1, 0, 0, 0]);

        simplexSolverService.insertConstraint([2, 1, 1, 0, 0, 0]);
        simplexSolverService.insertConstraint([3, 1, 1, 0, 0, 0]);
        simplexSolverService.insertConstraint([4, 1, 1, 0, 0, 0]);

        const matrix = simplexSolverService.matrix;
        const numberOfConstraints = simplexSolverService.numberOfConstraints;

        expect(numberOfConstraints).toEqual(3);
        expect(matrix[0]).toEqual([1, 1, 1, 0, 0, 0]);
        expect(matrix[1]).toEqual([2, 1, 1, 0, 0, 0]);
        expect(matrix[2]).toEqual([3, 1, 1, 0, 0, 0]);
        expect(matrix[3]).toEqual([4, 1, 1, 0, 0, 0]);

    })


    it('Then returns throw when insert constraint if objetive function is empty', async () => {
        const simplexSolverService = new SimplexSolverService();

        expect(() => simplexSolverService.insertConstraint([0, 1, 3])).toThrow(
            new InvalidDataException('Objetive function not found.'),
        );
    });

    it('When insert invalid constraint then return throw', async () => {
        const simplexSolverService = new SimplexSolverService();

        simplexSolverService.insertObjetiveFunction([1, 1, 1, 0, 0, 0]);

        expect(() => simplexSolverService.insertConstraint([0, 1, 3])).toThrow(
            new InvalidDataException('Invalid constraint.'),
        );
    });


    it('When insert empty constraint then return throw', async () => {
        const simplexSolverService = new SimplexSolverService();

        simplexSolverService.insertObjetiveFunction([1, 1, 1, 0, 0, 0]);

        expect(() => simplexSolverService.insertConstraint([])).toThrow(
            new InvalidDataException('Invalid constraint.'),
        );
    });

});