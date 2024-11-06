import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ProductService } from './services/product.service';
import { provideHttpClient } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';  
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore'; 

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
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    ProductService,
    
    provideHttpClient(),
    importProvidersFrom(
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireAuthModule,
      AngularFirestoreModule  
    ),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())  
  ]
};
