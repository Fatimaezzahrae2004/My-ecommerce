import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'], 
})
export class NavBarComponent implements OnInit {
  @Input() panier!: boolean;
  @Output() panierSelected = new EventEmitter<boolean>();
  
  isLoggedIn: boolean = false;
  user: User | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    
    this.authService.user$.subscribe((user: User | null) => { 
      this.user = user; 
      this.isLoggedIn = !!user; 
    });
  }

  afficherPanier(): void {
    this.panier = !this.panier;
    this.panierSelected.emit(this.panier);
  }

  onMesCommandesClick(event: Event): void {
    if (!this.isLoggedIn) {
      event.preventDefault();
      alert('Veuillez vous connecter pour accéder à vos commandes.');
      this.router.navigate(['/connexion']);
    }
  }

  onLogout(): void {
    this.authService.logout(); 
    this.router.navigate(['/']);
  }
}
