import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Produit } from '../../Modeles/produit';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  categories: { slug: string, name: string, url: string }[] = [];
  produits!: Array<Produit>;
  filteredProducts: Produit[] = [];

  selectedCategory: string = '';
  searchQuery: string = '';

  
  @Output() searchedText = new EventEmitter<string>();
  @Output() categorySelected = new EventEmitter<string>();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    
    this.productService.getCategories().subscribe(
      (data: any[]) => {
        console.log('Categories fetched:', data);
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );

    // Récupérer les produits
  this.productService.getProducts().subscribe(
    (data: any) => {
      console.log('Produits fetched:', data.products); 
      this.produits = data.products;
      this.filteredProducts = this.produits; 
    },
    (error) => {
      console.error('Error fetching products:', error);
    }
  );
  }


  onSearchByKey(event: any) {
    this.searchedText.emit(this.searchQuery);
    this.filterProducts();
  }

  
  onCategoryChange(event: any) {
    this.selectedCategory = event.target.value;
    this.categorySelected.emit(this.selectedCategory);
    this.filterProducts();
  }

  filterProducts(): void {
    if (this.selectedCategory === 'all') {
      
      this.filteredProducts = this.produits.filter(product =>
        product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      
      this.filteredProducts = this.produits.filter(product => {
        const matchesCategory = product.category === this.selectedCategory;
        const matchesSearchQuery = product.title.toLowerCase().includes(this.searchQuery.toLowerCase());
        return matchesCategory && matchesSearchQuery;
      });
    }
  
   
    console.log('Produits filtrés : ', this.filteredProducts);
  }
  
}
