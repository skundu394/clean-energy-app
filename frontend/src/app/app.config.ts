import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch  } from '@angular/common/http';
import { ChartDataService } from './services/chart-data.service';
import { withHashLocation } from '@angular/router';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withHashLocation()), provideClientHydration(), importProvidersFrom(CommonModule,  ReactiveFormsModule,RouterModule),
    provideHttpClient(),
    importProvidersFrom([ChartDataService],RouterModule)
   ]
};

