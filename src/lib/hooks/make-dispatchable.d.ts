import { DependencyList } from 'react';
import { useDispatch } from 'react-redux';
import { ActionCreator } from 'redux';

export type TDispatchable<T> = (deps: DependencyList | undefined) => T;

export default function makeDispatchable<T>(actionCreator: T) : TDispatchable<T>;
