import { Component, Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  @Input() panier!:boolean;
  @Output() panierSelected = new EventEmitter<boolean>;
  isLoggedIn: boolean = false;
  afficherPanier(){
    this.panier =!this.panier;
    this.panierSelected.emit(this.panier)  
  }
  constructor(private authService: AuthService, private router: Router) {
    // Vérifier si l'utilisateur est connecté
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  onMesCommandesClick(event: Event) {
    if (!this.isLoggedIn) {
      
      event.preventDefault();
      
      alert('Veuillez vous connecter pour accéder à vos commandes.');
      this.router.navigate(['/connexion']);
    }
  }

  onLogout() {
    
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    this.isLoggedIn = false;
   
    this.router.navigate(['/']);
  }
}
