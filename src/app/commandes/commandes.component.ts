import { Component, OnInit } from '@angular/core';
import { LignePanier } from '../../Modeles/LignePanier';
import { Commande } from '../../Modeles/commande';
import { PanierService } from '../services/panier.service'; 
import { CommandeService } from '../services/commande.service'; 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
@Component({
  selector: 'app-commandes',
  standalone: true,
  imports: [CommonModule, NavBarComponent],
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent implements OnInit {
  panierItems: LignePanier[] = []; // Produits dans le panier validé
  total: number = 0; 
  commandes: Commande[] = []; // Liste des commandes validées
  displayPanier: boolean = false;

  message: string = ''; 
  messageType: 'success' | 'error' = 'success';
  constructor(
    private panierService: PanierService,
    private commandeService: CommandeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Charger les produits du panier validé et le total
    this.panierItems = this.panierService.getPanier();
    this.total = this.panierItems.reduce((acc, item) => acc + (item.qte * item.produit.price), 0);

    
    this.commandes = this.commandeService.getCommandes();
  }

  

  // Méthode pour annuler une commande
  cancelCommande(id: number): void {
    const commandeIndex = this.commandes.findIndex(commande => commande.id === id);
    if (commandeIndex !== -1) {
      this.commandes[commandeIndex].status = 'Annulée'; // Mettre à jour le statut de la commande
      console.log('Commande annulée:', this.commandes[commandeIndex]);
      this.message = 'La commande a été annulée avec succès !';
      this.messageType = 'success';
    } else {
      this.message = 'Impossible d\'annuler la commande !';
      this.messageType = 'error';
    }
  }

  // Méthode pour valider la commande
  validateCommande(): void {
    if (this.panierItems.length > 0) {
      const newCommande = this.commandeService.validateCommande(this.panierItems, this.total); // Créer une commande
      console.log('Commande validée:', newCommande);
      this.message = 'Votre commande a été validée avec succès !';
      this.messageType = 'success';
    } else {
      this.message = 'Aucun produit dans le panier pour valider la commande.';
      this.messageType = 'error';
    }
  }

  // Méthode pour afficher ou masquer le panier
  showPanier(e: boolean) {
    this.displayPanier = e;
  }
}
