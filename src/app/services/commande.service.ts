import { Injectable } from '@angular/core';
import { Commande } from '../../Modeles/commande';
import { LignePanier } from '../../Modeles/LignePanier';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private commandes: Commande[] = [];

  getCommandes(): Commande[] {
    return this.commandes;
  }

  validateCommande(panierItems: LignePanier[], total: number): Commande {
    const newCommande: Commande = {
      id: this.commandes.length + 1,
      date: new Date().toISOString(),
      total: total,
      status: 'Validée',
      items: panierItems
    };
    this.commandes.push(newCommande);
    return newCommande;
  }
}
