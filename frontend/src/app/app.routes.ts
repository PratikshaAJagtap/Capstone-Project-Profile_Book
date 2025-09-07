// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { PostCreateComponent } from './pages/post-create/post-create';
import { MessagesComponent } from './pages/messages/messages';
import { ProfileComponent } from './pages/profile/profile';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard';
import { MoneyTransferComponent } from './pages/money-transfer/money-transfer';
import { ReviewsComponent } from './pages/reviews/reviews';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', loadComponent: () => import('./pages/register/register').then(m => m.RegisterComponent) },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'create-post', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'money-transfer', component: MoneyTransferComponent, canActivate: [AuthGuard] },
  { path: 'reviews', component: ReviewsComponent, canActivate: [AuthGuard] },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];