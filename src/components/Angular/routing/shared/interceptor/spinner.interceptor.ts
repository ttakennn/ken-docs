import { HttpInterceptorFn } from '@angular/common/http';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('spinner interceptor... ');
  return next(req);
};
