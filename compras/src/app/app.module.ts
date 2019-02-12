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
import {ComparadorPage} from '../pages/comparador/comparador';
import {pipePreco} from '../pipes/preco';
import { AdicionarPage } from '../modal/adicionar/adicionar';
import { EditarPage } from '../modal/editar/editar';
import { ComprarPage } from '../modal/comprar/comprar';

@NgModule({
  declarations: [    
    MyApp,
    HomePage,
    ListaPage,
    ComprasPage,
    ComparadorPage,
    pipePreco,
    AdicionarPage,
    EditarPage,
    ComprarPage,
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
    ComparadorPage,
    AdicionarPage,
    EditarPage,
    ComprarPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ArquivoProvider
  ]
})
export class AppModule {}
