import { Item } from "../entities/Item";

class SimplexSolverService {
  private items: Item[];
  private volumeLimit: number;
  private weightLimit: number;
  //private simplexTable: number | string;

  constructor(items: Item[], volumeLimit: number, weightLimit: number) {
    this.items = items;
    this.volumeLimit = volumeLimit;
    this.weightLimit = weightLimit;
  }


  private createSimplexTable() {




  }

}

export { SimplexSolverService };
