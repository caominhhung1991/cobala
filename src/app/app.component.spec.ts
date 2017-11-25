import { TestBed, async } from '@angular/core/testing';
import {HttpModule, Http } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule,Provider } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
// module
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { GuestModule} from './guest/guest.module';
// services
import { MainService } from './service/main.service';
import { AdminService } from './service/admin.service';
import { GuestService } from './service/guest.service';
import { UsersService } from './service/users.service';
import { TestService } from './service/test.service';
// components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserComponent } from './admin/user/user.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { SignUpComponent} from './components/sign-up/sign-up.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ModalChooseProductComponent } from './components/modals/modal-choose-product/modal-choose-product.component';
//guard
import { AuthguardGuard } from './guard/authguard.guard'
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        UserComponent,
        SignUpComponent,
        NotfoundComponent,
        ModalChooseProductComponent
      ]
    }).compileComponents();
  }));

  // it('should create the app', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // }));

  // it(`should have as title 'app'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app');
  // }));

  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  // }));
});
