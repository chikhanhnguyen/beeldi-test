export interface IReduxStoreSelector<T> {
    (state: any): T,
    (state: any, ...params: any[]): T
}

export default function makeSelector<T>(path: string, defaultValue: T): () => T;
export default function makeSelector<T>(selector: IReduxStoreSelector<T>): (...params: any[]) => T;
