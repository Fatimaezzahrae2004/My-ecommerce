import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produit } from '../../Modeles/produit';
import { PanierService } from '../services/panier.service';
import { LignePanier } from '../../Modeles/LignePanier';

@Component({
  selector: 'app-product-detail-modal',
  standalone: true,
  templateUrl: './product-detail-modal.component.html',
  styleUrls: ['./product-detail-modal.component.scss'],
  imports: [CommonModule]
})
export class ProductDetailModalComponent {
  @Input() product!: Produit;
  isOpen: boolean = false;

  @Input() selectedProduct!: Produit;

  constructor(private panierService: PanierService) {}

  // Method to open the modal
  open(product: Produit): void {
    this.product = product;
    this.isOpen = true;
  }

  // Method to close the modal
  close(): void {
    this.isOpen = false;
  }

  
}
