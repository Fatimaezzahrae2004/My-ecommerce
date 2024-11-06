import { Component, OnInit } from '@angular/core';
import { LignePanier } from '../../Modeles/LignePanier';
import { Commande } from '../../Modeles/commande';
import { PanierService } from '../services/panier.service'; 
import { CommandeService } from '../services/commande.service'; 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-commandes',
  standalone: true,
  imports: [CommonModule, NavBarComponent],
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent implements OnInit {
  panierItems: LignePanier[] = []; 
  total: number = 0; 
  commandes: Commande[] = []; 
  displayPanier: boolean = false;

  message: string = ''; 
  messageType: 'success' | 'error' = 'success';

  constructor(
    private panierService: PanierService,
    private commandeService: CommandeService,
    private router: Router,
    private auth: AngularFireAuth
  ) {}

  ngOnInit(): void {
   
    this.panierItems = this.panierService.getPanier();
    this.total = this.panierItems.reduce((acc, item) => acc + (item.qte * item.produit.price), 0);

    
    this.commandeService.getCommandes().subscribe(
      commandes => this.commandes = commandes,
      error => {
        this.message = "Erreur lors du chargement des commandes.";
        this.messageType = 'error';
      }
    );
  }

  
  cancelCommande(id: number): void {
    const commandeIndex = this.commandes.findIndex(commande => commande.idUser === id);
    if (commandeIndex !== -1) {
      this.commandes[commandeIndex].status = 'Annulée'; 
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
      this.commandeService.validateCommande(this.panierItems, this.total)
        .then(() => {
          this.message = 'Votre commande a été validée avec succès !';
          this.messageType = 'success';
        })
        .catch(error => {
          console.error('Erreur lors de la validation de la commande:', error);
          this.message = 'Erreur lors de la validation de la commande.';
          this.messageType = 'error';
        });
    } else {
      this.message = 'Aucun produit dans le panier pour valider la commande.';
      this.messageType = 'error';
    }
  }

  
  showPanier(e: boolean) {
    this.displayPanier = e;
  }
}
