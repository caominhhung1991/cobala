import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
// module
import { AdminRoutingModule } from './admin-routing.module';
import { GuestModule } from './../guest/guest.module';
import { ComponentModule } from './../components/component.module';
// component
import { AdminComponent } from './admin/admin.component';
import { QuanLyDonHangComponent } from './quan-ly-don-hang/quan-ly-don-hang.component';
import { QuanLySanPhamComponent } from './quan-ly-san-pham/quan-ly-san-pham.component';
import { DoanhThuComponent } from './thongke/doanh-thu/doanh-thu.component';
import { GoBackComponent } from './../components/go-back/go-back.component';
import { NavAdminComponent } from './nav-admin/nav-admin.component';
import { ChiTietDonHangComponent } from './chi-tiet-don-hang/chi-tiet-don-hang.component';
import { ThemSanPhamComponent } from './quan-ly-san-pham/them-san-pham/them-san-pham.component';
import { AllProductComponent } from './quan-ly-san-pham/all-product/all-product.component';
import { ModalProductComponent} from './../components/modals/modal-product/modal-product.component';
import { PhieuNhapKhoComponent } from './quan-ly-san-pham/phieu-nhap-kho/phieu-nhap-kho.component';
import { ModalAddProductToRepositoryComponent } from './../components/modals/modal-add-product-to-repository/modal-add-product-to-repository.component';
import { QuanLyUserComponent } from './quan-ly-user/quan-ly-user.component';
import { SuaThongTinComponent } from './../guest/sua-thong-tin/sua-thong-tin.component';
import { QuanLyKhoComponent } from './quan-ly-kho/quan-ly-kho.component';
import { KhoComponent } from './kho/kho.component';
import { PhieuXuatKhoComponent } from './phieu-xuat-kho/phieu-xuat-kho.component'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    AdminRoutingModule,
    RouterModule,
    GuestModule,
    ComponentModule,
    // Ng2FileInputModule.forRoot()
  ],
  declarations: [
    NavAdminComponent,
    AdminComponent,
    QuanLyDonHangComponent, 
    QuanLySanPhamComponent, 
    DoanhThuComponent,
    ChiTietDonHangComponent,
    ThemSanPhamComponent,
    AllProductComponent,
    ModalProductComponent,
    PhieuNhapKhoComponent,
    ModalAddProductToRepositoryComponent,
    QuanLyUserComponent,
    QuanLyKhoComponent,
    KhoComponent,
    PhieuXuatKhoComponent,
  ],
  exports: [
    AdminComponent,
    QuanLyDonHangComponent, 
    QuanLySanPhamComponent, 
    DoanhThuComponent,
    NavAdminComponent,
    ChiTietDonHangComponent,
    ThemSanPhamComponent,
    AllProductComponent,
    ModalProductComponent,
    PhieuNhapKhoComponent,
    ModalAddProductToRepositoryComponent,
    QuanLyUserComponent
  ]
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AdminModule { }
