import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BackgroundComponent } from './page/background/background.component';
import { PopupComponent } from './page/popup/popup.component';

import { ChromeService } from './service/chrome/chrome.service';
import { BackgroundService } from './service/entity/background.service';
import { PopupService } from './service/entity/popup.service';

const routes: Routes = [
  { path: 'background', component: BackgroundComponent },
  { path: 'popup', component: PopupComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule],
  providers: [ChromeService, BackgroundService, PopupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
