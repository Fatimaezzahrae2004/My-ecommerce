import { Component, Input, OnInit } from '@angular/core';
import { LignePanier } from '../../Modeles/LignePanier';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PanierService } from '../services/panier.service';
import { Commande } from '../../Modeles/commande';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [NgFor, RouterModule, NavBarComponent, CommonModule],
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
   
    const isLoggedIn = this.authService.isLoggedIn(); 

    if (isLoggedIn) {

      const commande: Commande = {
        idUser: parseInt(localStorage.getItem('userId') || '0', 10), 
        date: new Date().toISOString(),
        total: this.totalPrice,
        items: this.detailsPanier.map(item => ({
          produit: item.produit,
          qte: item.qte,
        })),
        status: 'en attente'
      };

      this.panierService.saveCommande(commande).then(() => {
        console.log('Commande enregistrée avec succès');
        this.router.navigate(['/mes-commandes']);  
      }).catch((error) => {
        console.error('Erreur lors de l\'enregistrement de la commande:', error);
      });

    } else {
      console.log('Utilisateur non connecté');
      this.router.navigate(['/connexion']); 
    }
  }

  
}
