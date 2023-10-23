class InvalidDataException extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.name = 'Invalid data exception';
    this.statusCode = statusCode;
  }
}

export { InvalidDataException };
