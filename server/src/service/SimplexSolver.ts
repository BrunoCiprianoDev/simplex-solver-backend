class SimplexSolver {

  private _table: number[][];

  constructor() {
    this._table = [];
  }

  public createObjetiveFunction(objetiveFunction: number[]) {
    this._table.push(objetiveFunction);
  }

  public insertRestrictions(restriction: number[]) {
    this._table.push(restriction);
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

    const entryColumn = this.getColumn(indexEntryColumn);

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


  // Calcular as novas linhas da matriz
  public calculateNewLine(line: number[], entryColumn: number, pivotLine: number[]): number[] {
    const pivot = line[entryColumn] * -1;
    const resultLine = pivotLine.map((value) => value * pivot);

    const newLine: number[] = [];
    for (let i = 0; i < resultLine.length; i++) {
      const sumValue = resultLine[i] + line[i];
      newLine.push(sumValue);
    }

    return newLine;
  }

  //Pega todos os valores em uma coluna da tabela
  public getColumn(columnIndex: number): number[] {
    if (columnIndex < 0 || columnIndex >= this._table[0].length) {
      throw new Error('O índice da coluna está fora dos limites.');
    }
    const column: number[] = this._table.map((row) => row[columnIndex]);
    return column;
  }

  //Pega todos os valores de uma linha
  public getRow(rowIndex: number): number[] {
    if (rowIndex < 0 || rowIndex >= this._table.length) {
      throw new Error('O índice da linha está fora dos limites.');
    }

    const row: number[] = this._table[rowIndex];

    return row;
  }


  public printTable(): void {
    console.log(this._table[0] + '\n' + this._table[1] + '\n', this._table[2] + '\n', this._table[3] + '\n');
  }
}

export { SimplexSolver };
