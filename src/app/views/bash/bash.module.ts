import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BashComponents } from './components';
import { BashServices } from './services';
import { BashComponent } from './bash.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  declarations: [BashComponent, ...BashComponents],
  providers: [...BashServices],
  exports: [BashComponent],
})
export class BashModule {}
