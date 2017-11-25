import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuaThongTinComponent } from './../guest/sua-thong-tin/sua-thong-tin.component';
import { FormsModule } from '@angular/forms';
import { GoBackComponent} from './go-back/go-back.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    SuaThongTinComponent,
    GoBackComponent
  ],
  exports: [SuaThongTinComponent,
    GoBackComponent],
})
export class ComponentModule { }
