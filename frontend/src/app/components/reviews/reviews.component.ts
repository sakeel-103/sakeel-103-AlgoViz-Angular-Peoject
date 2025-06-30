import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';

interface Review {
  id: number;
  author: string;
  content: string;
  questions: Question[];
}

interface Question {
  id: number;
  author: string;
  content: string;
  replies: Reply[];
  file?: File | null;
}

interface Reply {
  id: number;
  author: string;
  content: string;
}

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterModule, FormsModule],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewComponent implements OnInit {
  reviews: Review[] = [];
  loading: boolean = true;
  newReview: Partial<Review> = {};
  newQuestion: Partial<Question> = { file: null };
  newReply: Partial<Reply> = {};

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.fetchReviews();
    this.titleService.setTitle('GraphExplorer Pro | Reviews');
  }

  fetchReviews() {
    setTimeout(() => {
      this.reviews = [
        {
          id: 1,
          author: 'Alice',
          content: 'The graph traversal techniques were very insightful!',
          questions: [],
        },
      ];
      this.loading = false;
    }, 1000);
  }

  submitReview() {
    if (this.newReview.author && this.newReview.content) {
      const review: Review = {
        id: this.generateId(),
        author: this.newReview.author,
        content: this.newReview.content,
        questions: [],
      };
      this.reviews.unshift(review);
      this.newReview = {};
      this.saveToCSV();
    }
  }

  submitQuestion(reviewId: number) {
    const review = this.reviews.find((r) => r.id === reviewId);
    if (review && this.newQuestion.author && this.newQuestion.content) {
      const question: Question = {
        id: this.generateId(),
        author: this.newQuestion.author,
        content: this.newQuestion.content,
        replies: [],
        file: this.newQuestion.file,
      };
      review.questions.push(question);
      this.newQuestion = { file: null };
      this.saveToCSV();
    }
  }

  submitReply(reviewId: number, questionId: number) {
    const review = this.reviews.find((r) => r.id === reviewId);
    const question = review?.questions.find((q) => q.id === questionId);
    if (question && this.newReply.author && this.newReply.content) {
      const reply: Reply = {
        id: this.generateId(),
        author: this.newReply.author,
        content: this.newReply.content,
      };
      question.replies.push(reply);
      this.newReply = {};
      this.saveToCSV();
    }
  }

  generateId(): number {
    return Math.floor(Math.random() * 1000000);
  }

  saveToCSV() {
    console.log('Saving to CSV:', this.reviews);
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.newQuestion.file = target.files[0];
    }
  }

  getImageUrl(file: File): string {
    return URL.createObjectURL(file);
  }
}
