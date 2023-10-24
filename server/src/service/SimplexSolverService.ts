import { InvalidDataException } from "../shared/exceptions/InvalidDataException";

class SimplexSolverService {

    private _numberOfConstraints: number;
    private _matrix: number[][];
    private _verticalVariables: string[];
    private _horizontalVariables: string[];

    constructor() {
        this._numberOfConstraints = 0;
        this._matrix = [];
        this._verticalVariables = [];
        this._horizontalVariables = [];
    }

    public calculate() {

        this.initListVariables();

        while (this.hasNegativeValuesInObjectiveFunction()) {

            const indexEntryColumn = this.getIndexEntryColumn();
            const indexPivotRow = this.getIndexPivotRow(indexEntryColumn);

            this.updatePivotRow(indexEntryColumn, indexPivotRow);
            this.updateRows(indexEntryColumn, indexPivotRow);
            this.updateListVariables(indexEntryColumn, indexPivotRow);

        }

        return this.getResults();
    }

    public insertObjetiveFunction(objetiveFunction: number[]): void {
        if (objetiveFunction.length === 0) {
            throw new InvalidDataException("Invalid objetive function");
        }
        this._matrix.push(objetiveFunction);
    }

    public insertConstraint(constraint: number[]): void {
        if (this._matrix.length === 0) {
            throw new InvalidDataException("Objetive function not found.");
        }
        if (constraint.length !== this._matrix[0].length) {
            throw new InvalidDataException("Invalid constraint.");
        }

        this._matrix.push(constraint);
        this._numberOfConstraints++;
    }

    public initListVariables(): void {

        const objetiveLine = this._matrix[0];

        for (let index = 0; index < objetiveLine.length; index++) {
            if (objetiveLine[index] !== 0) {
                this._horizontalVariables.push(`X${index + 1}`);
            }
        }

        this._verticalVariables.push(`Z`);
        for (let index = 1; index <= this._numberOfConstraints; index++) {
            const slack = `F${index}`;
            this._horizontalVariables.push(slack);
            this._verticalVariables.push(slack);
        }

        this._horizontalVariables.push(`P`);

    }

    public updateListVariables(indexColumn: number, indexPivotLine: number): void {
        const tempExitColumnVar = this._horizontalVariables[indexColumn];
        this._verticalVariables[indexPivotLine] = tempExitColumnVar;
    }

    public getIndexEntryColumn(): number {
        if (this._matrix.length === 0) {
            throw new InvalidDataException('The matrix is empty');
        }

        const objectiveFunctionRow = this._matrix[0];

        let minIndex = 0;
        let minValue = objectiveFunctionRow[0];

        for (let i = 1; i < objectiveFunctionRow.length; i++) {
            if (objectiveFunctionRow[i] < minValue) {
                minValue = objectiveFunctionRow[i];
                minIndex = i;
            }
        }

        return minIndex;
    }

    public getColumnByIndex(columnIndex: number): number[] {
        if (columnIndex < 0 || columnIndex >= this._matrix[0].length) {
            throw new InvalidDataException('The column index not found.');
        }
        const column: number[] = this._matrix.map((row) => row[columnIndex]);
        return column;
    }

    public getRowByIndex(rowIndex: number): number[] {
        if (rowIndex < 0 || rowIndex >= this._matrix.length) {
            throw new InvalidDataException('The row index not found.');
        }
        const row: number[] = this._matrix[rowIndex];
        return row;
    }

    public getIndexPivotRow(indexEntryColumn: number): number {

        const entryColumn = this.getColumnByIndex(indexEntryColumn);

        const metadata: Record<number, number> = {};

        for (let index = 0; index < this._matrix.length; index++) {
            const row = this._matrix[index];
            if (index > 0 && entryColumn[index] > 0) {
                metadata[index] = row[row.length - 1] / entryColumn[index];
            }
        }

        const pivotRowIndex = Object.keys(metadata).reduce((a, b) => {
            const aValue = parseInt(a, 10);
            const bValue = parseInt(b, 10);
            return metadata[aValue] < metadata[bValue] ? a : b;
        });

        return parseInt(pivotRowIndex, 10);
    }

    public updatePivotRow(indexEntryColumn: number, indexPivotRow: number): void {
        const currentPivotRow = this.getRowByIndex(indexPivotRow);
        const elementEntryColumn = currentPivotRow[indexEntryColumn];

        const newPivotRow: number[] = [];
        for (let i = 0; i < currentPivotRow.length; i++) {
            const newValue = currentPivotRow[i] / elementEntryColumn;
            newPivotRow.push(newValue);
        }

        this._matrix[indexPivotRow] = newPivotRow;

    }

    public updateRows(indexEntryColumn: number, indexPivotRow: number): void {

        const pivotRow = this.getRowByIndex(indexPivotRow);


        for (let lineIndex = 0; lineIndex < this._matrix.length; lineIndex++) {
            if (lineIndex !== indexPivotRow) {
                const columnEntryElementLine = this._matrix[lineIndex][indexEntryColumn] * -1;
                const updatedRow: number[] = [];
                this._matrix[lineIndex].map((oldValue, index) => {
                    const newValue = oldValue + (pivotRow[index] * columnEntryElementLine);
                    updatedRow.push(newValue);
                })
                this._matrix[lineIndex] = updatedRow;
            }
        }

    }

    public hasNegativeValuesInObjectiveFunction(): boolean {
        return this._matrix[0].some((value) => value < 0);
    }


    public getResults() {

        const itemsResult: Array<Array<number | string>> = [];

        for (let index = 0; index < this._verticalVariables.length; index++) {
            if (this._verticalVariables[index].startsWith("X")) {
                const lineResult: Array<number | string> = [];

                lineResult.push(this._verticalVariables[index]); // Adiciona a variavel

                const findLineTable = this.getRowByIndex(index);
                lineResult.push(findLineTable[findLineTable.length - 1]);

                itemsResult.push(lineResult);
            }
        }

        const zResult: Array<number | string> = [];
        const zLine = this.getRowByIndex(0);
        zResult.push("Z");
        zResult.push(zLine[zLine.length - 1]);

        itemsResult.push(zResult);

        return itemsResult;

    }

    get matrix(): number[][] {
        return this._matrix;
    }

    get verticalVariables(): string[] {
        return this._verticalVariables;
    }

    get horizontalVariables(): string[] {
        return this._horizontalVariables;
    }

    get numberOfConstraints(): number {
        return this._numberOfConstraints;
    }

}

export { SimplexSolverService }