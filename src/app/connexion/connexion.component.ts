import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [NavBarComponent,FormsModule, SignupComponent, RouterOutlet],
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {
  email: string = '';
  password: string = '';
  displayPanier: boolean = false;

  constructor(private router: Router) {}

  // Méthode appelée lors de la soumission du formulaire
  onSubmit() {
    if (this.email.trim() !== '' && this.password.trim() !== '') {
      
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', this.email);

      
      this.router.navigate(['/']);
    } else {
      alert('Veuillez remplir tous les champs');
    }
  }

  // Méthode pour afficher ou masquer le panier
  showPanier(e: boolean) {
    this.displayPanier = e;
  }
}
