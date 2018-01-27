import { Observable } from 'rxjs/Observable';

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
