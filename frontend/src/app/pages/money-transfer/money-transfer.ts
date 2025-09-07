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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

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

@Component({
  selector: 'app-money-transfer',
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
    MatToolbarModule,
    MatChipsModule,
    RouterModule
  ],
  templateUrl: './money-transfer.html',
  styleUrls: ['./money-transfer.scss']
})
export class MoneyTransferComponent implements OnInit {
  users: any[] = [];
  transactions: Transaction[] = [];
  currentUser: any = null;
  isLoading = false;
  isTransferring = false;

  transferForm = {
    receiverId: '',
    amount: 0,
    description: ''
  };

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.loadUsers();
    this.loadTransactions();
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

  loadTransactions() {
    this.apiService.getTransactions().subscribe({
      next: (transactions) => {
        this.transactions = transactions;
      },
      error: (error) => {
        console.error('Error loading transactions:', error);
      }
    });
  }

  transferMoney() {
    if (!this.transferForm.receiverId || !this.transferForm.amount || this.transferForm.amount <= 0) {
      this.snackBar.open('Please fill in all fields with valid amounts', 'Close', { duration: 3000 });
      return;
    }

    this.isTransferring = true;
    const transactionData = {
      senderId: this.currentUser.userId,
      receiverId: parseInt(this.transferForm.receiverId),
      amount: this.transferForm.amount,
      description: this.transferForm.description || 'Money transfer'
    };

    this.apiService.createTransaction(transactionData).subscribe({
      next: (response) => {
        this.isTransferring = false;
        this.snackBar.open('Money transferred successfully!', 'Close', { duration: 3000 });
        this.resetForm();
        this.loadTransactions();
      },
      error: (error) => {
        this.isTransferring = false;
        this.snackBar.open('Transfer failed. Please try again.', 'Close', { duration: 3000 });
        console.error('Error transferring money:', error);
      }
    });
  }

  resetForm() {
    this.transferForm = {
      receiverId: '',
      amount: 0,
      description: ''
    };
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

  getTransactionStatusColor(status: string): string {
    switch (status) {
      case 'Completed': return 'primary';
      case 'Pending': return 'accent';
      case 'Failed': return 'warn';
      default: return 'primary';
    }
  }
}
