import uniqueWith = require('lodash/uniqWith');
import isEqual = require('lodash/isEqual');

import { Observable } from 'rxjs/Observable';
import { IResultRow } from '@services/moviedb';

const DUMMY_LOGIN_CREDENTIALS = [
  {
    id: 'foo',
    password: '1234'
  },
  {
    id: 'bar',
    password: 'qwerty'
  }
];

export const verifyLogin = (loginCredentials: {
  id: string;
  password: string;
}) => {
  const found = DUMMY_LOGIN_CREDENTIALS.find(
    c =>
      c.id === loginCredentials.id && c.password === loginCredentials.password
  );

  return Observable.of(!!found).delay(500);
};

const createWishlistKey = (id: string) => `userId:${id}`;

export const addToWishlist = (id: string, movie: IResultRow) => {
  try {
    const key = createWishlistKey(id);

    const wishlist: IResultRow[] = (() => {
      try {
        return JSON.parse(localStorage.getItem(key) || '[]');
      } catch (e) {
        return [];
      }
    })();

    if (!wishlist.length) {
      localStorage.setItem(key, JSON.stringify([movie]));
    } else {
      localStorage.setItem(
        key,
        JSON.stringify(uniqueWith([...wishlist, movie], isEqual))
      );
    }

    return true;
  } catch (e) {
    return false;
  }
};

export const getWishlist = (id: string): IResultRow[] => {
  const key = createWishlistKey(id);

  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch (e) {
    return [];
  }
};
