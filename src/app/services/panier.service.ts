import { Injectable } from '@angular/core';
import { LignePanier } from '../../Modeles/LignePanier';
import { Firestore, collection, addDoc, doc } from '@angular/fire/firestore';
import { Commande } from '../../Modeles/commande';
@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private storageKey = 'panier'; 
  
  private localStorageKey = 'panier'; 
  private commandesCollection;
  constructor(private firestore: Firestore) {
    this.commandesCollection = collection(this.firestore, 'commandes');
  }


 
  saveCommande(commande: Commande): Promise<void> {
    return addDoc(this.commandesCollection, commande)
      .then(() => console.log('Commande enregistrée avec succès'))
      .catch((error) => console.error('Erreur lors de l\'enregistrement de la commande :', error));
  }

  addToPanier(lignePanier: LignePanier): void {
    const currentPanier = this.getPanier(); 

    
    const existingProductIndex = currentPanier.findIndex(item => item.produit.id === lignePanier.produit.id);
    
    if (existingProductIndex !== -1) {
      
      currentPanier[existingProductIndex].qte += lignePanier.qte; 
    } else {
   
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

  
  private savePanierToStorage(panier: LignePanier[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(panier));
  }



  

  removeFromPanier(index: number): void {
    const currentPanier = this.getPanier(); 
    currentPanier.splice(index, 1); 
    localStorage.setItem(this.localStorageKey, JSON.stringify(currentPanier)); 
  }
}
