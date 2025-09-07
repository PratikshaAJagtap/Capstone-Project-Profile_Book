import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService, User } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login successfully', () => {
    const mockUser: User = {
      userId: 1,
      username: 'testuser',
      role: 'User',
      profileImage: 'test.jpg'
    };
    const mockResponse = {
      token: 'mock-jwt-token',
      user: mockUser
    };

    service.login({ username: 'testuser', password: 'password' }).subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(service.getCurrentUser()).toEqual(mockUser);
      expect(service.isAuthenticated()).toBe(true);
    });

    const req = httpMock.expectOne('http://localhost:5263/api/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should register successfully', () => {
    const mockUserData = {
      username: 'newuser',
      password: 'password',
      role: 'User'
    };

    service.register(mockUserData).subscribe(response => {
      expect(response).toBeDefined();
    });

    const req = httpMock.expectOne('http://localhost:5263/api/auth/register');
    expect(req.request.method).toBe('POST');
    req.flush({ success: true });
  });

  it('should logout and clear session', () => {
    localStorage.setItem('token', 'mock-token');
    localStorage.setItem('user', JSON.stringify({ userId: 1, username: 'test' }));

    service.logout();

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
    expect(service.getCurrentUser()).toBeNull();
    expect(service.isAuthenticated()).toBe(false);
  });

  it('should check if user is admin', () => {
    const adminUser: User = {
      userId: 1,
      username: 'admin',
      role: 'Admin'
    };
    const regularUser: User = {
      userId: 2,
      username: 'user',
      role: 'User'
    };

    service.updateCurrentUser(adminUser);
    expect(service.isAdmin()).toBe(true);

    service.updateCurrentUser(regularUser);
    expect(service.isAdmin()).toBe(false);
  });

  it('should check if user is regular user', () => {
    const adminUser: User = {
      userId: 1,
      username: 'admin',
      role: 'Admin'
    };
    const regularUser: User = {
      userId: 2,
      username: 'user',
      role: 'User'
    };

    service.updateCurrentUser(regularUser);
    expect(service.isUser()).toBe(true);

    service.updateCurrentUser(adminUser);
    expect(service.isUser()).toBe(false);
  });
});
