class SimplexSolver {

    private _table: number[][];
    private _verticalVariables: string[];
    private _horizontalVariables: string[];

    constructor() {
        this._table = [];
        this._verticalVariables = [];
        this._horizontalVariables = [];
    }

    public createObjetiveFunction(objetiveFunction: number[]) {
        this._table.push(objetiveFunction);
    }

    public insertRestrictions(restriction: number[]) {
        this._table.push(restriction);
    }

    public createListVariables(numberOfVariables: number) {

        for (let index = 1; index <= numberOfVariables; index++) {
            this._horizontalVariables.push(`X${index}`);
        }

        this._verticalVariables.push(`Z`);
        for (let index = 1; index <= numberOfVariables; index++) {
            const slack = `F${index}`;
            this._horizontalVariables.push(slack);
            this._verticalVariables.push(slack);
        }

        this._horizontalVariables.push(`P`);

    }

    public updateListVariables(indexPivotLine: number, indexColumn: number) {
        const tempExitColumnVar = this._horizontalVariables[indexColumn];
        const tempPivorLineVar = this._verticalVariables[indexPivotLine];
        this._horizontalVariables[indexColumn] = tempPivorLineVar;
        this._verticalVariables[indexPivotLine] = tempExitColumnVar;
    }

    public getIndexEntryColumn(): number {
        if (this._table.length === 0) {
            throw new Error('A tabela está vazia, não é possível obter a coluna de entrada.');
        }

        const objectiveFunctionRow = this._table[0];
        if (objectiveFunctionRow.length === 0) {
            throw new Error('A primeira linha da tabela está vazia, não é possível obter a coluna de entrada.');
        }

        // Encontre o índice do menor valor na primeira linha
        let minIndex = 0;
        let minValue = objectiveFunctionRow[0];

        for (let i = 1; i < objectiveFunctionRow.length; i++) {
            if (objectiveFunctionRow[i] < minValue) {
                minValue = objectiveFunctionRow[i];
                minIndex = i;
            }
        }

        return minIndex; // Retorna o INDICE da coluna com menor valor
    }

    public getPivotLine(indexEntryColumn: number): number {

        const entryColumn = this.getColumnByIndex(indexEntryColumn);

        const metadata: Record<number, number> = {};

        for (let index = 0; index < this._table.length; index++) { //Percorre as linhas da coluna
            const row = this._table[index];
            if (index > 0 && entryColumn[index] > 0) { //Se o indice da linha for > 0 e o elemento da coluna for != 0
                metadata[index] = row[row.length - 1] / entryColumn[index];
            }
        }

        // Encontre o índice da linha com o menor valor no objeto metadata
        const pivotLineIndex = Object.keys(metadata).reduce((a, b) => {
            const aValue = parseInt(a, 10);
            const bValue = parseInt(b, 10);
            return metadata[aValue] < metadata[bValue] ? a : b;
        });

        return parseInt(pivotLineIndex, 10);
    }


    // Divide toda linha pivot pelo elemento da coluna que entrou
    public calculateNewPivotLine(entryColumn: number, currentPivotLine: number[]) {
        const elementEntryColumn = currentPivotLine[entryColumn];

        const newPivotLine: number[] = [];
        for (let i = 0; i < currentPivotLine.length; i++) {
            const newValue = currentPivotLine[i] / elementEntryColumn;
            newPivotLine.push(newValue);
        }

        return newPivotLine;

    }

    // Calcular as novas linhas da matriz
    public calculateNewLine(oldLine: number[], indexEntryColumn: number, pivotLine: number[]): number[] {
        const pivotElementLine = oldLine[indexEntryColumn] * -1;

        const newLine: number[] = [];
        for (let index = 0; index < pivotLine.length; index++) {
            const newValue = oldLine[index] + (pivotLine[index] * pivotElementLine);
            newLine.push(newValue);
        }

        return newLine;

    }

    //Retorna uma coluna pelo indice
    public getColumnByIndex(columnIndex: number): number[] {
        if (columnIndex < 0 || columnIndex >= this._table[0].length) {
            throw new Error('O índice da coluna está fora dos limites.');
        }
        const column: number[] = this._table.map((row) => row[columnIndex]);
        return column;
    }

    //Retorna uma linha pelo indice
    public getLineByIndex(lineIndex: number): number[] {
        if (lineIndex < 0 || lineIndex >= this._table.length) {
            throw new Error('O índice da linha está fora dos limites.');
        }

        const line: number[] = this._table[lineIndex];

        return line;
    }

    //Verifica se há valores negativos na linha da função objetiva
    public hasNegativeValuesInObjectiveFunction(): boolean {
        return this._table[0].some((value) => value < 0);
    }

    public printTable(): void {
        console.log("Horizontal var: " + this._horizontalVariables);
        console.log("Vertical var: " + this._verticalVariables);
        console.log(this._table[0] + '\n' + this._table[1] + '\n', this._table[2] + '\n', this._table[3] + '\n');
    }

    // Obtem os resultados por variaveis
    public getResults() {

        const itemsResult: Array<Array<number | string>> = [];

        for (let index = 0; index < this._verticalVariables.length; index++) {
            if (this._verticalVariables[index].startsWith("X")) {
                const lineResult: Array<number | string> = [];

                lineResult.push(this._verticalVariables[index]); // Adiciona a variavel

                const findLineTable = this.getLineByIndex(index);
                lineResult.push(findLineTable[findLineTable.length - 1]);

                itemsResult.push(lineResult);
            }
        }

        const zResult: Array<number | string> = [];
        const zLine = this.getLineByIndex(0);
        zResult.push("Z");
        zResult.push(zLine[zLine.length - 1]);

        itemsResult.push(zResult);

        console.log(itemsResult);

    }

    public calculate() {

        const indexEntryColumn = this.getIndexEntryColumn();
        const column = this.getColumnByIndex(indexEntryColumn);

        const pivotLineIndex = this.getPivotLine(indexEntryColumn);
        const pivotLine = this.getLineByIndex(pivotLineIndex);
        const newPivotLine = this.calculateNewPivotLine(indexEntryColumn, pivotLine);

        this._table[pivotLineIndex] = newPivotLine;

        for (let lineIndex = 0; lineIndex < column.length; lineIndex++) {
            if (lineIndex !== pivotLineIndex) {
                const currentLine = this.getLineByIndex(lineIndex);
                this._table[lineIndex] = this.calculateNewLine(currentLine, indexEntryColumn, newPivotLine);
            }
        }

        this.updateListVariables(pivotLineIndex, indexEntryColumn);

        if (this.hasNegativeValuesInObjectiveFunction()) {
            this.calculate();
        }
    }


}

export { SimplexSolver };
