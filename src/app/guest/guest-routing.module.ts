import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// component
import { ContactComponent } from './contact/contact.component';
import { NganhHangComponent } from './nganh-hang/nganh-hang.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home-page', pathMatch: 'full' },
  { path: 'home-page', component: HomePageComponent},
  { path: 'contact', component: ContactComponent },
  { path: 'nganh-hang', component: NganhHangComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule { }
