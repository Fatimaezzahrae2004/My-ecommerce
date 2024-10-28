import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router:Router, private authService: AuthService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const isAuthenticated = this.authService.isAuthenticated();
    
    if (isAuthenticated) {
      const authReq = req.clone({
        headers:req.headers.set('Authorization','Bearer'+this.authService.getToken)
      });
      return next.handle(authReq);
    }
    
    return next.handle(req);
  }
}
