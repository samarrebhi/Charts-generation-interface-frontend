import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('authToken');

  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Basic ${token}`,
        },
      })
    : req;

  return next(authReq);
};
