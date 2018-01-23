export default function loggerMiddleware() {
  // tslint:disable-next-line ban-types
  return (next: Function) => (action: any) => {
    // tslint:disable-next-line no-console
    console.log(action);
    return next(action);
  };
}
