import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComparadorPage } from './comparador';

@NgModule({
  declarations: [
    ComparadorPage,
  ],
  imports: [
    IonicPageModule.forChild(ComparadorPage),
  ],
})
export class ComparadorPageModule {}
