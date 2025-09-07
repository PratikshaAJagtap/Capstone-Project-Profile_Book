import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

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

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    RouterModule
  ],
  templateUrl: './reviews.html',
  styleUrls: ['./reviews.scss']
})
export class ReviewsComponent implements OnInit {
  users: any[] = [];
  reviews: Review[] = [];
  currentUser: any = null;
  isLoading = false;
  isSubmitting = false;

  reviewForm = {
    reviewedUserId: '',
    rating: 5,
    comment: ''
  };

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.loadUsers();
    this.loadReviews();
  }

  loadUsers() {
    this.isLoading = true;
    this.apiService.getUsers().subscribe({
      next: (users) => {
        this.users = users.filter(user => user.userId !== this.currentUser.userId);
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.snackBar.open('Failed to load users', 'Close', { duration: 3000 });
        console.error('Error loading users:', error);
      }
    });
  }

  loadReviews() {
    this.apiService.getReviews().subscribe({
      next: (reviews) => {
        this.reviews = reviews;
      },
      error: (error) => {
        console.error('Error loading reviews:', error);
      }
    });
  }

  submitReview() {
    if (!this.reviewForm.reviewedUserId || !this.reviewForm.comment.trim()) {
      this.snackBar.open('Please fill in all fields', 'Close', { duration: 3000 });
      return;
    }

    this.isSubmitting = true;
    const reviewData = {
      reviewerId: this.currentUser.userId,
      reviewedUserId: parseInt(this.reviewForm.reviewedUserId),
      rating: this.reviewForm.rating,
      comment: this.reviewForm.comment.trim()
    };

    this.apiService.createReview(reviewData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.snackBar.open('Review submitted successfully!', 'Close', { duration: 3000 });
        this.resetForm();
        this.loadReviews();
      },
      error: (error) => {
        this.isSubmitting = false;
        this.snackBar.open('Failed to submit review', 'Close', { duration: 3000 });
        console.error('Error submitting review:', error);
      }
    });
  }

  resetForm() {
    this.reviewForm = {
      reviewedUserId: '',
      rating: 5,
      comment: ''
    };
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  getRatingStars(rating: number): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? 'star' : 'star_border');
    }
    return stars;
  }

  getAverageRating(): number {
    if (this.reviews.length === 0) return 0;
    const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round((total / this.reviews.length) * 10) / 10;
  }
}
