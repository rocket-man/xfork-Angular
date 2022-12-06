import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEventType
} from '@angular/common/http';
import { tap } from 'rxjs/operators';

//Check PROVIDERS on app.module
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    //we can control here eith If which all requests must be allowed to pass/INTERCEPTED.
    const modifiedRequest = req.clone({
      headers: req.headers.append('Auth', 'xyz')
    });
    //originally requests are immutable, so they need to be cloned
    return next.handle(modifiedRequest); //let the request to continue on its way
    //.pipe we can use to modify in any other way if necessary, check loggining-interface
  }
}
