import { Component, ViewChild } from '@angular/core';
import { Produit } from '../../Modeles/produit';
import { NgFor, NgIf,CommonModule } from '@angular/common';
import { ProductItemComponent } from '../product-item/product-item.component';
import { LignePanier } from '../../Modeles/LignePanier';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { PanierComponent } from '../panier/panier.component';
import { ProductService } from '../services/product.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ProductDetailModalComponent } from '../product-detail-modal/product-detail-modal.component';
import { RouterModule } from '@angular/router';
import { PanierService } from '../services/panier.service'; 
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listeproduit',
  standalone: true,
  imports: [NgFor, ProductItemComponent, NavBarComponent, NgIf, PanierComponent, SearchBarComponent, ProductDetailModalComponent, RouterModule,FormsModule,CommonModule],
  templateUrl: './listeproduit.component.html',
  styleUrls: ['./listeproduit.component.scss']
})
export class ListeproduitComponent implements OnInit {
  produits!: Array<Produit>;
  displayPanier: boolean = false;
  selectedProduct!: Produit | null;
  categories: { slug: string, name: string, url: string }[] = [];
  detailProduit: LignePanier[] = [];
  filteredProducts: Produit[] = []; 
  selectedCategory: string = 'all'; 
  searchQuery: string = ''; 
  isOpen: boolean = false;

  newComment: { user: string; date: string; commentaire: string; rating: number } = {
    user: '',
    date: '',
    commentaire: '',
    rating: 0
  };
  comments: Array<{ user: string; date: string; commentaire: string; rating: number }> = [];

  @ViewChild('productDetailModal') productDetailModal!: ProductDetailModalComponent;

  constructor(private productService: ProductService, private panierService: PanierService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (response: any) => {
        this.produits = response.products;
        this.filteredProducts = this.produits; // Initialiser filteredProducts avec tous les produits
      },
      (error: any) => {
        console.error('Error fetching products', error);
      }
    );

    this.productService.getCategories().subscribe(
      (response: { slug: string, name: string, url: string }[]) => {
        this.categories = response;
      },
      (error: any) => {
        console.error('Error fetching categories', error);
      }
    );
    this.newComment.date = new Date().toISOString().split('T')[0];
  }

  // Méthode pour filtrer les produits à la fois par catégorie et par mot clé
  filterProducts(): void {
    this.filteredProducts = this.produits.filter((produit) => {
      const matchesCategory = this.selectedCategory === 'all' || produit.category.toLowerCase() === this.selectedCategory.toLowerCase();
      const matchesSearchQuery = produit.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCategory && matchesSearchQuery; 
    });
  }

  // Méthode appelée lorsque l'utilisateur recherche par mot clé
  onSearchByKey(searchQuery: string) {
    this.filteredProducts = this.produits.filter((produit) =>
      produit.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Méthode appelée lorsque l'utilisateur sélectionne une catégorie
  onCategorySelected(categorySlug: string): void {
    this.selectedCategory = categorySlug;
    this.filterProducts(); 
  }

  onProductAdded(p: Produit): void {
    const newLignePanier = new LignePanier();
    newLignePanier.produit = p;
    newLignePanier.qte = 1;
    this.panierService.addToPanier(newLignePanier); 
    console.log(this.panierService.getPanier()); 
  }

  showPanier(e: boolean): void {
    this.displayPanier = e;
  }

  showProductDetails(produit: Produit): void {
    this.selectedProduct = produit;
  }

  closeProductDetails(): void {
    this.selectedProduct = null;
  }

  // Method to add the selected product to the cart
  addProductToCart(): void {
    if (this.selectedProduct) {
      const newLignePanier = new LignePanier();
      newLignePanier.produit = this.selectedProduct;
      newLignePanier.qte = 1; 
      this.panierService.addToPanier(newLignePanier); 
      console.log(this.panierService.getPanier()); 
      this.closeProductDetails(); 
    }
  }
  

  // Méthode pour changer la catégorie depuis un select (HTML)
  onCategoryChange(event: any): void {
    this.onCategorySelected(event.target.value); 
    
  }




  // Method to add a comment
  addComment(): void {
    if (this.newComment.user && this.newComment.commentaire && this.newComment.rating) {
  
      this.comments.push({
        ...this.newComment,
        
        date: this.newComment.date || new Date().toISOString().split('T')[0] 
      });

      this.newComment = { user: '', date: '', commentaire: '', rating: 0 };

      console.log('Comment added:', this.comments);
    }
  }
}
