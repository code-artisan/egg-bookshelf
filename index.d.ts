import type { Bookshelf, Model } from 'bookshelf';

declare module 'egg' {
  export interface Application {
    bookshelf: Bookshelf;
    model: {
      [key: string]: Model;
    }
  }

  export interface Context {
    models: {
      [key: string]: Model;
    }
  }
}
