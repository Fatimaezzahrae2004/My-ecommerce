import { Component, Input, OnInit } from '@angular/core';
import { LignePanier } from '../../Modeles/LignePanier';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [NgFor, RouterModule, NavBarComponent],
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {
  @Input() detailsPanier: LignePanier[] = [];
  displayPanier: boolean = false;
  private localStorageKey = 'panier';  
  constructor(
    private panierService: PanierService,
    private authService: AuthService,
    private router: Router
    
  ) {}

  ngOnInit(): void {
   
    if (this.detailsPanier.length === 0) {
      this.detailsPanier = this.panierService.getPanier(); 
    }
    console.log("Current cart details:", this.detailsPanier);
  }

  get totalPrice(): number {
    return this.detailsPanier.reduce((acc, item) => acc + (item.qte * item.produit.price), 0);
  }

  increaseQuantity(index: number): void {
    this.detailsPanier[index].qte++;
  }

  decreaseQuantity(index: number): void {
    if (this.detailsPanier[index].qte > 1) {
      this.detailsPanier[index].qte--;
    }
  }

  removeItem(index: number): void {
    this.panierService.removeFromPanier(index); 
    this.detailsPanier.splice(index, 1); 
  }
  showPanier(e: boolean): void {
    this.displayPanier = e;
  }

 
  validatePanier(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
      
      this.router.navigate(['/mes-commandes']);
    } else {
      
      this.router.navigate(['/connexion']);
    }
  }

  
}
