import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login';
import { AuthService } from '../../../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        HttpClientTestingModule,
        MatSnackBarModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error for empty fields', () => {
    component.username = '';
    component.password = '';
    
    component.login();
    
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('should login successfully for admin user', () => {
    const mockResponse = {
      token: 'mock-token',
      user: { userId: 1, username: 'admin', role: 'Admin' }
    };
    
    authService.login.and.returnValue(of(mockResponse));
    component.username = 'admin';
    component.password = 'password';
    
    component.login();
    
    expect(authService.login).toHaveBeenCalledWith({
      username: 'admin',
      password: 'password'
    });
    expect(router.navigate).toHaveBeenCalledWith(['/admin-dashboard']);
  });

  it('should login successfully for regular user', () => {
    const mockResponse = {
      token: 'mock-token',
      user: { userId: 1, username: 'user', role: 'User' }
    };
    
    authService.login.and.returnValue(of(mockResponse));
    component.username = 'user';
    component.password = 'password';
    
    component.login();
    
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should handle login error', () => {
    authService.login.and.returnValue(throwError(() => new Error('Login failed')));
    component.username = 'user';
    component.password = 'wrongpassword';
    
    component.login();
    
    expect(component.isLoading).toBe(false);
  });
});
