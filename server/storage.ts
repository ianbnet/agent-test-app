import { type Counter } from "@shared/schema";

export interface IStorage {
  getCount(): Promise<Counter>;
  incrementCount(): Promise<Counter>;
}

export class MemStorage implements IStorage {
  private count: number;

  constructor() {
    this.count = 0;
  }

  async getCount(): Promise<Counter> {
    return { id: 1, count: this.count };
  }

  async incrementCount(): Promise<Counter> {
    this.count += 5;
    return { id: 1, count: this.count };
  }
}

export const storage = new MemStorage();
