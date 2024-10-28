import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';  
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { LignePanier } from '../../Modeles/LignePanier';
import { PanierService } from '../services/panier.service';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-detail-produit',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule, FormsModule, NavBarComponent],
  templateUrl: './detail-produit.component.html',
  styleUrls: ['./detail-produit.component.scss']
})
export class DetailProduitComponent implements OnInit {
  selectedProduct: any;
  displayPanier: boolean = false;
  stars: number[] = [1, 2, 3, 4, 5];

  newComment: { user: string; date: string; commentaire: string; rating: number } = {
    user: '',
    date: '',
    commentaire: '',
    rating: 0
  };
  comments: Array<{ user: string; date: string; commentaire: string; rating: number }> = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private panierService: PanierService // Injection de PanierService
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe(
        (product) => {
          this.selectedProduct = product;
          this.loadComments(); // Load comments for the selected product
        },
        (error) => {
          console.error('Error fetching product:', error);
        }
      );
    }
    this.newComment.date = new Date().toISOString().split('T')[0];
  }

  rate(value: number): void {
    this.newComment.rating = value;
  }

  showPanier(e: boolean): void {
    this.displayPanier = e;
  }

  // Method to load comments from local storage
  loadComments(): void {
    if (this.selectedProduct && this.selectedProduct.id) {
      const storedComments = localStorage.getItem(this.selectedProduct.id);
      if (storedComments) {
        this.comments = JSON.parse(storedComments);
      }
    }
  }

  // Method to add a new comment
  addComment(): void {
    if (this.newComment.user && this.newComment.commentaire && this.newComment.rating) {
      this.comments.push({ ...this.newComment });

      // Save comments to local storage
      localStorage.setItem(this.selectedProduct.id, JSON.stringify(this.comments));

      // Reset the comment form
      this.newComment = {
        user: '',
        date: new Date().toISOString().split('T')[0],
        commentaire: '',
        rating: 0
      };
    }
  }

  // Method to add the selected product to the cart
  addProductToCart(): void {
    if (this.selectedProduct) {
      const newLignePanier = new LignePanier();
      newLignePanier.produit = this.selectedProduct;
      newLignePanier.qte = 1; 
      this.panierService.addToPanier(newLignePanier); 
      console.log('Panier:', this.panierService.getPanier()); 
    }
  }
}
