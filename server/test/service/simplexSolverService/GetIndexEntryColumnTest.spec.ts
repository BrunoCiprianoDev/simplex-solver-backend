import { SimplexSolverService } from "../../../src/service/SimplexSolverService";
import { InvalidDataException } from "../../../src/shared/exceptions/InvalidDataException";

describe('Test index entry column', () => {

    it('Verify index returned', async () => {
        const simplexSolverService = new SimplexSolverService();

        simplexSolverService.insertObjetiveFunction([-3, -5, 0, 0, 0, 0]);

        simplexSolverService.insertConstraint([1, 0, 1, 0, 0, 4]);
        simplexSolverService.insertConstraint([0, 2, 0, 1, 0, 12]);
        simplexSolverService.insertConstraint([2, 3, 0, 0, 1, 21]);

        simplexSolverService.initListVariables();

        const indexEntryColumn = simplexSolverService.getIndexEntryColumn();

        expect(indexEntryColumn).toEqual(1);
    })


    it('If matrix is empty then return throw', async () => {
        const simplexSolverService = new SimplexSolverService();
        expect(() => simplexSolverService.getIndexEntryColumn()).toThrow(
            new InvalidDataException('The matrix is empty'),
        );
    })

});
