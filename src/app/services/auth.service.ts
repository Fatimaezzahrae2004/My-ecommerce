import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, UserCredential } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { UserInterface } from '../user.interface'; 
import { signal } from '@angular/core';
import { user, User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private firebaseAuth = inject(Auth);
  public user$ = user(this.firebaseAuth);
  public currentUserSig = signal<UserInterface | null>(null);

  constructor() {
    
    this.user$.subscribe((user: User | null) => {
      if (user) {
       
        this.currentUserSig.set({
          email: user.email || '',
          username: user.displayName || '',
        });
      } else {
        this.currentUserSig.set(null); 
      }
    });
  }

  
  register(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      .then((response: UserCredential) => {
        if (response.user) {
          return updateProfile(response.user, { displayName: username });
        }
        return Promise.resolve(); 
      });

    return from(promise);
  }

  
  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(() => {
        localStorage.setItem('authToken', 'some-token'); 
        localStorage.setItem('username', email);
      })
      .catch((error) => {
        console.error('Login failed:', error);
        throw error; 
      });

    return from(promise);
  }

  
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  
  logout(): Promise<void> {
    return this.firebaseAuth.signOut().then(() => {
      localStorage.removeItem('authToken'); 
      localStorage.removeItem('username');
      this.currentUserSig.set(null); 
    });
  }
  getToken(): string | null {
    // Récupère le token depuis le stockage local (localStorage, sessionStorage, etc.)
    return localStorage.getItem('authToken');
  }
}
