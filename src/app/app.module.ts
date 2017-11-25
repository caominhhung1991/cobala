import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
// module
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { GuestModule} from './guest/guest.module';
import { ComponentModule } from './components/component.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module
// guard 
import { AuthguardGuard } from './guard/authguard.guard'
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
// import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component'
import { SuaThongTinComponent} from './guest/sua-thong-tin/sua-thong-tin.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    AdminModule,
    GuestModule,
    FormsModule,
    ComponentModule,
    // Ng2SearchPipeModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UserComponent,
    // SignUpComponent,
    // ShoppingCartComponent,
    NotfoundComponent,
    ModalChooseProductComponent,
    // SuaThongTinComponent
  ],
  providers: [
    MainService,
    AdminService,
    GuestService,
    UsersService,
    TestService,
    AuthguardGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
