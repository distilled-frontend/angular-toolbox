import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { LogService } from './app/log.service';
import { StateService } from './app/state.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    LogService,
    StateService
  ],
});
