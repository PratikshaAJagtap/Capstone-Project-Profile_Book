import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService, Post, Report } from '../../services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatTableModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatMenuModule,
    RouterModule
  ],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.scss']
})
export class AdminDashboardComponent implements OnInit {
  posts: Post[] = [];
  reports: Report[] = [];
  users: any[] = [];
  currentUser: any = null;
  isLoading = false;
  selectedTab = 0;

  // Table columns
  postsColumns = ['user', 'content', 'status', 'actions'];
  reportsColumns = ['reportedUser', 'reportingUser', 'reason', 'timestamp', 'actions'];
  usersColumns = ['username', 'role', 'postsCount', 'actions'];

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    
    // Load posts
    this.apiService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
      },
      error: (error) => {
        console.error('Error loading posts:', error);
      }
    });

    // Load reports
    this.apiService.getReports().subscribe({
      next: (reports) => {
        this.reports = reports;
      },
      error: (error) => {
        console.error('Error loading reports:', error);
      }
    });

    // Load users
    this.apiService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error loading users:', error);
      }
    });
  }

  approvePost(post: Post) {
    this.updatePostStatus(post, 'Approved');
  }

  rejectPost(post: Post) {
    this.updatePostStatus(post, 'Rejected');
  }

  updatePostStatus(post: Post, status: string) {
    this.apiService.updatePost(post.postId, { ...post, status }).subscribe({
      next: (response) => {
        post.status = status;
        this.snackBar.open(`Post ${status.toLowerCase()} successfully`, 'Close', { duration: 3000 });
      },
      error: (error) => {
        this.snackBar.open('Failed to update post status', 'Close', { duration: 3000 });
        console.error('Error updating post:', error);
      }
    });
  }

  resolveReport(report: Report) {
    this.apiService.updateReportStatus(report.reportId, 'Resolved').subscribe({
      next: (response) => {
        this.reports = this.reports.filter(r => r.reportId !== report.reportId);
        this.snackBar.open('Report resolved successfully', 'Close', { duration: 3000 });
      },
      error: (error) => {
        this.snackBar.open('Failed to resolve report', 'Close', { duration: 3000 });
        console.error('Error resolving report:', error);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
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

  getStatusColor(status: string): string {
    switch (status) {
      case 'Approved': return 'primary';
      case 'Pending': return 'accent';
      case 'Rejected': return 'warn';
      default: return 'primary';
    }
  }

  getPostsCount(userId: number): number {
    return this.posts.filter(post => post.userId === userId).length;
  }

  getPendingPostsCount(): number {
    return this.posts.filter(post => post.status === 'Pending').length;
  }
}
