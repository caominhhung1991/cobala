import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
// Component
import { QuanLyDonHangComponent } from './quan-ly-don-hang/quan-ly-don-hang.component';
import { QuanLySanPhamComponent } from './quan-ly-san-pham/quan-ly-san-pham.component';
import { DoanhThuComponent } from './thongke/doanh-thu/doanh-thu.component';
import { QuanLyUserComponent } from './quan-ly-user/quan-ly-user.component';
import { ChiTietDonHangComponent } from './chi-tiet-don-hang/chi-tiet-don-hang.component';
// guard
import { AuthguardGuard } from './../guard/authguard.guard'
import { AdminComponent } from './admin/admin.component';
import { ThemSanPhamComponent } from './quan-ly-san-pham/them-san-pham/them-san-pham.component';
import { PhieuNhapKhoComponent } from './quan-ly-san-pham/phieu-nhap-kho/phieu-nhap-kho.component';
import { AllProductComponent } from './quan-ly-san-pham/all-product/all-product.component';
import { KhoComponent } from './kho/kho.component';

const routes: Routes = [
  // { path: "admin", component: QuanLySanPhamComponent},
  { 
    path: "admin", 
    component: AdminComponent, 
    children: [
      { path: '', canActivate:[AuthguardGuard], component: QuanLyDonHangComponent},
      { path: "quanlydonhang", canActivate:[AuthguardGuard], component: QuanLyDonHangComponent},
      { 
        path: "quanlysanpham", 
        canActivate:[AuthguardGuard], 
        component: QuanLySanPhamComponent,
        children: [
          { path: '', component: ThemSanPhamComponent},
          { path: 'themsanpham', component: ThemSanPhamComponent},
          { path: 'phieunhapkho', component: PhieuNhapKhoComponent},
          { path: 'allproduct', component: AllProductComponent},
          { path: 'kho', component: KhoComponent}
        ]
      },
      { path: "quanlydoanhthu",canActivate:[AuthguardGuard], component: DoanhThuComponent},
      { path: "quanlyuser", canActivate:[AuthguardGuard], component: QuanLyUserComponent},
      { path: "donhang/:id", component: ChiTietDonHangComponent}
    ]
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
