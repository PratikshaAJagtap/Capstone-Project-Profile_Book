import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Post {
  postId: number;
  userId: number;
  content: string;
  postImage?: string;
  status: string;
  timestamp?: string;
  user?: {
    username: string;
    profileImage?: string;
  };
}

export interface Message {
  messageId: number;
  senderId: number;
  receiverId: number;
  messageContent: string;
  timestamp: string;
  sender?: {
    username: string;
    profileImage?: string;
  };
  receiver?: {
    username: string;
    profileImage?: string;
  };
}

export interface Report {
  reportId: number;
  reportedUserId: number;
  reportingUserId: number;
  reason: string;
  timestamp: string;
  reportedUser?: {
    username: string;
  };
  reportingUser?: {
    username: string;
  };
}

export interface Transaction {
  transactionId: number;
  senderId: number;
  receiverId: number;
  amount: number;
  description: string;
  timestamp: string;
  status: string;
  sender?: { username: string };
  receiver?: { username: string };
}

export interface Review {
  reviewId: number;
  reviewerId: number;
  reviewedUserId: number;
  rating: number;
  comment: string;
  timestamp: string;
  reviewer?: { username: string; profileImage?: string };
  reviewedUser?: { username: string; profileImage?: string };
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL = 'http://localhost:5161/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Posts
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.API_URL}/posts`, { headers: this.getHeaders() });
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.API_URL}/posts/${id}`, { headers: this.getHeaders() });
  }

  createPost(post: any): Observable<Post> {
    // Handle FormData differently - don't set Content-Type header
    if (post instanceof FormData) {
      const token = this.authService.getToken();
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.post<Post>(`${this.API_URL}/posts`, post, { headers });
    } else {
      return this.http.post<Post>(`${this.API_URL}/posts`, post, { headers: this.getHeaders() });
    }
  }

  updatePost(id: number, post: any): Observable<Post> {
    return this.http.put<Post>(`${this.API_URL}/posts/${id}`, post, { headers: this.getHeaders() });
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/posts/${id}`, { headers: this.getHeaders() });
  }

  // Messages
  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.API_URL}/messages`, { headers: this.getHeaders() });
  }

  getConversation(userId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.API_URL}/messages/conversation/${userId}`, { headers: this.getHeaders() });
  }

  sendMessage(message: any): Observable<Message> {
    return this.http.post<Message>(`${this.API_URL}/messages`, message, { headers: this.getHeaders() });
  }

  // Users
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/users`, { headers: this.getHeaders() });
  }

  getUser(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/users/${id}`, { headers: this.getHeaders() });
  }

  updateUser(id: number, user: any): Observable<any> {
    // Handle FormData differently - don't set Content-Type header
    if (user instanceof FormData) {
      const token = this.authService.getToken();
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.put<any>(`${this.API_URL}/users/${id}`, user, { headers });
    } else {
      return this.http.put<any>(`${this.API_URL}/users/${id}`, user, { headers: this.getHeaders() });
    }
  }

  // Reports
  getReports(): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.API_URL}/reports`, { headers: this.getHeaders() });
  }

  createReport(report: any): Observable<Report> {
    return this.http.post<Report>(`${this.API_URL}/reports`, report, { headers: this.getHeaders() });
  }

  updateReportStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.API_URL}/reports/${id}/status`, { status }, { headers: this.getHeaders() });
  }

  // Money Transfer
  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.API_URL}/transactions`, { headers: this.getHeaders() });
  }

  createTransaction(transaction: any): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.API_URL}/transactions`, transaction, { headers: this.getHeaders() });
  }

  // Reviews
  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.API_URL}/reviews`, { headers: this.getHeaders() });
  }

  createReview(review: any): Observable<Review> {
    return this.http.post<Review>(`${this.API_URL}/reviews`, review, { headers: this.getHeaders() });
  }

  // Notifications
  getNotifications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/notifications`, { headers: this.getHeaders() });
  }

  markNotificationAsRead(id: number): Observable<any> {
    return this.http.put(`${this.API_URL}/notifications/${id}/read`, {}, { headers: this.getHeaders() });
  }
}
