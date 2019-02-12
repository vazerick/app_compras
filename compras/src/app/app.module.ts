import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListaPage } from '../pages/lista/lista';
import { ComprasPage } from '../pages/compras/compras';
import { ArquivoProvider } from '../providers/arquivo/arquivo';
import { IonicStorageModule } from '@ionic/storage';
import {ComparadorPage, pipePreco} from '../pages/comparador/comparador';

@NgModule({
  declarations: [
      pipePreco,
    MyApp,
    HomePage,
    ListaPage,
    ComprasPage,
    ComparadorPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListaPage,
    ComprasPage,
    ComparadorPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ArquivoProvider
  ]
})
export class AppModule {}
