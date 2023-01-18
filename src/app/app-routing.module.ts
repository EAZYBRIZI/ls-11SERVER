import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { NotAuthGuard } from './auth/not-auth.guard';
import { RegisterComponent } from './auth/register/register.component';
import { PageOneComponent } from './pages/page-one/page-one.component';
import { PageThreeComponent } from './pages/page-three/page-three.component';
import { PageTwoComponent } from './pages/page-two/page-two.component';
import { SecurePageComponent } from './secured/secure-page/secure-page.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'securePage',
    pathMatch: 'full'
  },
  {
    path: 'auth/login',
    component: LoginComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'main',
    component: PageOneComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'news',
    component: PageTwoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contacts',
    component: PageThreeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'securePage',
    component: SecurePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'books',
    loadChildren: () => import('./books/books.module').then( m => m.BooksModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
