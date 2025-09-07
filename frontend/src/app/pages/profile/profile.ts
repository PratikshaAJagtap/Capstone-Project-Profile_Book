import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService, Post } from '../../services/api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    RouterModule
  ],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: any = null;
  userPosts: Post[] = [];
  isLoading = false;
  isEditing = false;
  selectedTab = 0;
  
  // Profile editing
  editForm = {
    username: '',
    profileImage: null as File | null
  };
  imagePreview: string | null = null;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.loadUserPosts();
    this.initializeEditForm();
  }

  initializeEditForm() {
    this.editForm.username = this.currentUser?.username || '';
  }

  loadUserPosts() {
    if (!this.currentUser) return;
    
    this.isLoading = true;
    this.apiService.getPosts().subscribe({
      next: (posts) => {
        this.userPosts = posts.filter(post => post.userId === this.currentUser.userId);
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.snackBar.open('Failed to load posts', 'Close', { duration: 3000 });
        console.error('Error loading posts:', error);
      }
    });
  }

  startEditing() {
    this.isEditing = true;
    this.initializeEditForm();
  }

  cancelEditing() {
    this.isEditing = false;
    this.imagePreview = null;
    this.editForm.profileImage = null;
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.editForm.profileImage = file;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfile() {
    if (!this.editForm.username.trim()) {
      this.snackBar.open('Username is required', 'Close', { duration: 3000 });
      return;
    }

    this.isLoading = true;
    
    const formData = new FormData();
    formData.append('username', this.editForm.username);
    
    if (this.editForm.profileImage) {
      formData.append('profileImage', this.editForm.profileImage);
    }

    this.apiService.updateUser(this.currentUser.userId, formData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.isEditing = false;
        this.snackBar.open('Profile updated successfully!', 'Close', { duration: 3000 });
        // Update current user in auth service
        this.currentUser = { ...this.currentUser, ...response };
        this.authService.updateCurrentUser(this.currentUser);
      },
      error: (error) => {
        this.isLoading = false;
        this.snackBar.open('Failed to update profile', 'Close', { duration: 3000 });
        console.error('Error updating profile:', error);
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  getPostStatusColor(status: string): string {
    switch (status) {
      case 'Approved': return 'primary';
      case 'Pending': return 'accent';
      case 'Rejected': return 'warn';
      default: return 'primary';
    }
  }

  getApprovedPostsCount(): number {
    return this.userPosts.filter(p => p.status === 'Approved').length;
  }
}
