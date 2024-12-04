import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterModule  } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  content: string = 'Welcome to the Clean Energy Dashboard!';
  imageList: string[] = [
    'assets/images/Sweden.png',
    'assets/images/Norway.png',
    'assets/images/Finland.png',
    'assets/images/Denmark.png',
    'assets/images/Iceland.png'
  ];

  currentImageIndex: number = 0;
  currentImage: string = this.imageList[this.currentImageIndex];

 // Ask AI form variables
 question: string = '';
 response: string = '';

 isHighContrast: boolean = false;
// ADA/WCAG: Toggles High Contrast Mode to enhance accessibility for users with low vision or light sensitivity
  toggleHighContrast() {
    this.isHighContrast = !this.isHighContrast;

    // Apply or remove the high-contrast class from the body element
    const body = document.body;
    if (this.isHighContrast) {
      body.classList.add('high-contrast');
    } else {
      body.classList.remove('high-contrast');
    }
  }

  constructor(private authService: AuthService, private router: Router) {
    this.startImageRotation();
  }
  goToSummary() {
    this.router.navigate(['/summary']);
  }

  goToReports() {
    this.router.navigate(['/reports']);
  }
  logout(): void {
    this.authService.logout();
  }

 // Image Rotation Logic
 startImageRotation() {
  setInterval(() => {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.imageList.length;
    this.currentImage = this.imageList[this.currentImageIndex];
  }, 3000); // Change image every 3 seconds
}
  // ADA/WCAG: Ask AI Form logic to process user questions and provide real-time responses
  onSubmit() {
    if (this.question.trim()) {
      // Placeholder for AI response logic
      this.response = `You asked: "${this.question}". AI will respond soon!`;
    }
  }
}






