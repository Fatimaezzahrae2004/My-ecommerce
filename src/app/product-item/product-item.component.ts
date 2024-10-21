import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Produit } from '../../Modeles/produit';
import { LignePanier } from '../../Modeles/LignePanier';
import { PanierService } from '../services/panier.service';
import { NgStyle, NgIf } from '@angular/common';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [NgStyle, NgIf],
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'] 
})
export class ProductItemComponent {
  @Input() produit!: Produit; 
  @Output() selectedProduct = new EventEmitter<Produit>();

  constructor(private panierService: PanierService) {}

  onProductAdded() {
    const newLignePanier = new LignePanier();
    newLignePanier.produit = this.produit;
    newLignePanier.qte = 1; 
    this.panierService.addToPanier(newLignePanier); 
    console.log(this.panierService.getPanier()); 
  }

  // Méthode pour obtenir l'état du stock
  getState(stock: number): string {
    return stock > 0 ? "en stock" : "en rupture de stock";
  }

  // Méthode pour obtenir la couleur en fonction du stock
  getColor(stock: number): string {
    return stock > 0 ? "green" : "red";
  }
}
