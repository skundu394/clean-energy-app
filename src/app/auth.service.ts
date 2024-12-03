import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }, { headers });
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('jwt') || '';
    if (token && token.length > 0) {
        console.log('User is logged in, JWT token found:', token);
        return true;
    } else {
        console.log('User is not logged in, no valid JWT token found.');
        return false;
    }
}
  // isLoggedIn(): boolean {
  //   const token: string | null = window.localStorage.getItem('jwt');
  //   if (!token) {
  //     console.log('User is not logged in, no JWT token found.');
  //     return false;
  //   }
  //   console.log('User is logged in, JWT token found:', token);
  //   return true;
  // }

  // isLoggedIn(): boolean {
  //   return !!localStorage.getItem('jwt');
  // }

  logout(): void {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }


  getToken(): string | null {
    return typeof window !== 'undefined' ? window.localStorage.getItem('jwt') : null;
  }

}


