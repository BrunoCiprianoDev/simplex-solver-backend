class Item {
  private _varName: string;
  private _itemName: string;
  private _weight: number;
  private _volume: number;
  private _stockQuantity: number;

  constructor(varName: string, itemName: string, weight: number, volume: number, stockQuantity: number) {
    this._varName = varName;
    this._itemName = itemName;
    this._weight = weight;
    this._volume = volume;
    this._stockQuantity = stockQuantity;
  }

  get varName(): string {
    return this._varName;
  }

  set varName(newVarName: string) {
    this._varName = newVarName;
  }

  get itemName(): string {
    return this._itemName;
  }

  set itemName(newItemName: string) {
    this._itemName = newItemName;
  }

  get weight(): number {
    return this._weight;
  }

  set weight(newWeight: number) {
    this._weight = newWeight;
  }

  get volume(): number {
    return this._volume;
  }

  set volume(newVolume: number) {
    this._volume = newVolume;
  }

  get stockQuantity(): number {
    return this._stockQuantity;
  }

  set stockQuantity(newStockQuantity: number) {
    this._stockQuantity = newStockQuantity;
  }
}

export { Item };
