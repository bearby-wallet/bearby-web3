import { ContentProvider } from 'packages/massa';


export class Contract {
  readonly #provider: ContentProvider;

  constructor(provider: ContentProvider) {
    this.#provider = provider;
  }

  deploy() {}

  call() {}

  read() {}
}
