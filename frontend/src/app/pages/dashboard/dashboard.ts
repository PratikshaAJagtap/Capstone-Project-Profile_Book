import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService, Post } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatBadgeModule,
    MatChipsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    RouterModule
  ]
})
export class DashboardComponent implements OnInit {
  posts: Post[] = [];
  currentUser: any = null;
  isLoading = false;
  sidebarOpen = false;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.loadPosts();
  }

  loadPosts() {
    this.isLoading = true;
    this.apiService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts.filter(post => post.status === 'Approved');
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.snackBar.open('Failed to load posts', 'Close', { duration: 3000 });
        console.error('Error loading posts:', error);
      }
    });
  }

  createPost() {
    this.router.navigate(['/create-post']);
  }

  viewProfile() {
    this.router.navigate(['/profile']);
  }

  viewMessages() {
    this.router.navigate(['/messages']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  likePost(post: Post) {
    // TODO: Implement like functionality
    this.snackBar.open('Like functionality coming soon!', 'Close', { duration: 2000 });
  }

  sharePost(post: Post) {
    // TODO: Implement share functionality
    this.snackBar.open('Share functionality coming soon!', 'Close', { duration: 2000 });
  }

  reportPost(post: Post) {
    // TODO: Implement report functionality
    this.router.navigate(['/report', post.postId]);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
