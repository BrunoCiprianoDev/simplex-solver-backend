import { SimplexSolverService } from "../../../src/service/SimplexSolverService";
import { InvalidDataException } from "../../../src/shared/exceptions/InvalidDataException";

describe('Test method create objetive function', () => {


    it("Verify insertion objetive function in matrix", async () => {
        const simplexSolverService = new SimplexSolverService();

        simplexSolverService.insertObjetiveFunction([1, 1, 1, 0, 0, 0]);

        const matrix = simplexSolverService.matrix;

        expect(matrix[0]).toEqual([1, 1, 1, 0, 0, 0]);
    })

    it('When insert empty objetive function then throw', async () => {
        const simplexSolverService = new SimplexSolverService();

        expect(() => simplexSolverService.insertObjetiveFunction([])).toThrow(
            new InvalidDataException('Invalid objetive function'),
        );
    });

});