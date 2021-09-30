import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BashComponents } from './components';
import { BashServices } from './services';
import { BashComponent } from './bash.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BashComponent, ...BashComponents],
  providers: [...BashServices],
  exports: [
    BashComponent
  ]
})
export class BashModule {}
