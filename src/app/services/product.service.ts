import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'https://dummyjson.com/products';
  

  constructor(private http: HttpClient) { }

  
  getProducts(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getCategories(): Observable<{ slug: string, name: string, url: string }[]> {
    const apiUrl = 'https://dummyjson.com/products/categories';
  
    return this.http.get<{ slug: string, name: string, url: string }[]>(apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching categories:', error);
        return throwError(() => new Error('Failed to fetch categories'));
      })
    );
  }
  
  

  getProductBycategory(){
    return this.http.get('https://dummyjson.com/products/category-list')

  }

  getProductBykey(text : string){
    return this.http.get(`https://dummyjson.com/products/search?q=${text}`)
  }
  // Récupérer un produit par ID
  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching product by ID:', error);
        return throwError(() => new Error('Failed to fetch product by ID'));
      })
    );
  }
}
  
  

