import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ProductService } from './services/product.service';
import { provideHttpClient } from '@angular/common/http';


const firebaseConfig = {
  apiKey: "AIzaSyC-kYuyC8Ye-0L_lqRc9agDlbRdrJj--zE",
  authDomain: "my-e-commerce-9812a.firebaseapp.com",
  projectId: "my-e-commerce-9812a",
  storageBucket: "my-e-commerce-9812a.appspot.com",
  messagingSenderId: "24582890873",
  appId: "1:24582890873:web:6faf667f67c39a11703ba8",
  measurementId: "G-WM1XFCDHDJ"
};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), ProductService, provideHttpClient()]
};
