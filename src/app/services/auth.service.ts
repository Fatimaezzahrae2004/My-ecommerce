import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, UserCredential, signOut, user, User } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { UserInterface } from '../user.interface'; 
import { signal } from '@angular/core'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private firebaseAuth = inject(Auth); 
  public currentUserSig = signal<UserInterface | null>(null); 
  public user$ = user(this.firebaseAuth); 

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

  
  isLoggedIn(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.firebaseAuth.onAuthStateChanged((user: User | null) => { 
        observer.next(!!user); 
      });
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
    return signOut(this.firebaseAuth).then(() => {
      localStorage.removeItem('authToken'); 
      localStorage.removeItem('username'); 
      this.currentUserSig.set(null);
    });
  }

  
  getToken(): string | null {
    return localStorage.getItem('authToken'); 
  }
}
