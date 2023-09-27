export class Singleton<T> {
  private static instance: any;

  public static getInstance<T>(constructor: new () => T): T {
    if (!this.instance) {
      this.instance = new constructor();
    }
    return this.instance;
  }
}
