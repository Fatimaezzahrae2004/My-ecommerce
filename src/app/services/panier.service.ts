import { Injectable } from '@angular/core';
import { LignePanier } from '../../Modeles/LignePanier';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private storageKey = 'panier'; 
  
  private localStorageKey = 'panier'; 

  constructor() {
   
    this.loadPanierFromStorage();
  }

  addToPanier(lignePanier: LignePanier): void {
    const currentPanier = this.getPanier(); 

    
    const existingProductIndex = currentPanier.findIndex(item => item.produit.id === lignePanier.produit.id);
    
    if (existingProductIndex !== -1) {
      // Si le produit existe déjà, incrémentez la quantité
      currentPanier[existingProductIndex].qte += lignePanier.qte; 
    } else {
      // Sinon, ajoutez le nouvel article
      currentPanier.push(lignePanier);
    }

    localStorage.setItem(this.localStorageKey, JSON.stringify(currentPanier)); 
  }

  getPanier(): LignePanier[] {
    const panier = localStorage.getItem(this.localStorageKey);
    return panier ? JSON.parse(panier) : []; 
  }

  
  clearPanier(): void {
    localStorage.removeItem(this.storageKey);
  }

  
  private loadPanierFromStorage(): void {
    const panier = this.getPanier(); 
    if (panier) {
      this.savePanierToStorage(panier); 
    }
  }

  // Saves the current cart to Local Storage
  private savePanierToStorage(panier: LignePanier[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(panier));
  }



  

  removeFromPanier(index: number): void {
    const currentPanier = this.getPanier(); 
    currentPanier.splice(index, 1); 
    localStorage.setItem(this.localStorageKey, JSON.stringify(currentPanier)); 
  }
}
