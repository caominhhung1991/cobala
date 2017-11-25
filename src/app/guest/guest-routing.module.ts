import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// component
import { ContactComponent } from './contact/contact.component';
import { NganhHangComponent } from './nganh-hang/nganh-hang.component';

const routes: Routes = [
  { path: 'contact', component: ContactComponent },
  { path: 'nganh-hang', component: NganhHangComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule { }
