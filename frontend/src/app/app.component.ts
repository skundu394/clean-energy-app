import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'clean-energy-app';

  constructor(private router: Router) {}

  logout() {
    // Clear the JWT token from localStorage
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    localStorage.removeItem('jwt');
    }
    // Redirect the user to the login page
    this.router.navigate(['/login']);
  }
}
