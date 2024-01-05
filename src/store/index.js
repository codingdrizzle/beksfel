import { atom, createStore } from 'jotai'
import { atomWithStorage } from 'jotai/utils'


export const token = atomWithStorage('token', "");

export const authUser = atomWithStorage('user', "");

export const store = createStore();