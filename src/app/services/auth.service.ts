import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


 
  login(username: string, password: string): boolean {
    
    if (username === 'user' && password === 'password') {
      
      localStorage.setItem('authToken', 'some-token');
      localStorage.setItem('username', username); 
      return true;
    }
    return false;
  }

  // Méthode pour vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    
    return !!localStorage.getItem('authToken');
  }

  logout() {
    // Supprimer le token de session pour déconnecter l'utilisateur
    localStorage.removeItem('authToken');
  }


  // Récupérer le nom d'utilisateur depuis le localStorage
  getUsername(): string | null {
    return localStorage.getItem('username');
  }

}