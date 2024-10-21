import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';

import { routes } from './app/app.routes';

// Ajoute les routes dans appConfig
appConfig.providers.push(provideRouter(routes)); // Ajoute les routes à appConfig

bootstrapApplication(AppComponent, appConfig) // Utilise uniquement appConfig
  .catch((err) => console.error(err));