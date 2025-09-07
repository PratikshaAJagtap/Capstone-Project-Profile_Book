import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    RouterModule
  ],
  templateUrl: './post-create.html',
  styleUrls: ['./post-create.scss']
})
export class PostCreateComponent implements OnInit {
  content = '';
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  isLoading = false;
  currentUser: any = null;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.selectedFile = null;
    this.imagePreview = null;
  }

  createPost() {
    if (!this.content.trim() && !this.selectedFile) {
      this.snackBar.open('Please add some content or an image', 'Close', { duration: 3000 });
      return;
    }

    this.isLoading = true;
    
    const formData = new FormData();
    formData.append('content', this.content);
    formData.append('userId', this.currentUser.userId.toString());
    formData.append('status', 'Pending');
    
    if (this.selectedFile) {
      formData.append('postImage', this.selectedFile);
    }

    this.apiService.createPost(formData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.snackBar.open('Post created successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.isLoading = false;
        this.snackBar.open('Failed to create post', 'Close', { duration: 3000 });
        console.error('Error creating post:', error);
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
