import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService, Message } from '../../services/api.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    RouterModule
  ],
  templateUrl: './messages.html',
  styleUrls: ['./messages.scss']
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  conversations: any[] = [];
  selectedConversation: any = null;
  newMessage = '';
  currentUser: any = null;
  isLoading = false;
  isSending = false;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.loadConversations();
  }

  loadConversations() {
    this.isLoading = true;
    this.apiService.getMessages().subscribe({
      next: (messages) => {
        this.messages = messages;
        this.buildConversations();
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.snackBar.open('Failed to load messages', 'Close', { duration: 3000 });
        console.error('Error loading messages:', error);
      }
    });
  }

  buildConversations() {
    const conversationMap = new Map();
    
    this.messages.forEach(message => {
      const otherUserId = message.senderId === this.currentUser.userId 
        ? message.receiverId 
        : message.senderId;
      
      const otherUser = message.senderId === this.currentUser.userId 
        ? message.receiver 
        : message.sender;
      
      if (!conversationMap.has(otherUserId)) {
        conversationMap.set(otherUserId, {
          userId: otherUserId,
          user: otherUser,
          lastMessage: message,
          unreadCount: 0
        });
      }
      
      const conversation = conversationMap.get(otherUserId);
      if (new Date(message.timestamp) > new Date(conversation.lastMessage.timestamp)) {
        conversation.lastMessage = message;
      }
      
      // Count unread messages (messages received but not sent by current user)
      if (message.receiverId === this.currentUser.userId) {
        conversation.unreadCount++;
      }
    });
    
    this.conversations = Array.from(conversationMap.values())
      .sort((a, b) => new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime());
  }

  selectConversation(conversation: any) {
    this.selectedConversation = conversation;
    this.loadConversationMessages(conversation.userId);
  }

  loadConversationMessages(userId: number) {
    this.apiService.getConversation(userId).subscribe({
      next: (messages) => {
        this.messages = messages;
      },
      error: (error) => {
        this.snackBar.open('Failed to load conversation', 'Close', { duration: 3000 });
        console.error('Error loading conversation:', error);
      }
    });
  }

  sendMessage() {
    if (!this.newMessage.trim() || !this.selectedConversation) {
      return;
    }

    this.isSending = true;
    const messageData = {
      senderId: this.currentUser.userId,
      receiverId: this.selectedConversation.userId,
      messageContent: this.newMessage.trim()
    };

    this.apiService.sendMessage(messageData).subscribe({
      next: (message) => {
        this.newMessage = '';
        this.isSending = false;
        this.loadConversationMessages(this.selectedConversation.userId);
        this.loadConversations(); // Refresh conversation list
      },
      error: (error) => {
        this.isSending = false;
        this.snackBar.open('Failed to send message', 'Close', { duration: 3000 });
        console.error('Error sending message:', error);
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  formatTime(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  }

  isMyMessage(message: Message): boolean {
    return message.senderId === this.currentUser.userId;
  }
}
