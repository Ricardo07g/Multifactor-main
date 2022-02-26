import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PasswordGeneratorService } from '../app/services/password/password-generator.service';
import { DatabaseService } from '../app/services/database/database.service';
import {enableProdMode} from '@angular/core';

//enableProdMode();

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, PasswordGeneratorService, DatabaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
