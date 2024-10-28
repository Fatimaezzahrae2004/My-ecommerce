import { Component,inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [NavBarComponent, FormsModule, RouterOutlet, RouterModule,ReactiveFormsModule],
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {
  displayPanier: boolean = false;
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authService=inject(AuthService)
  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  errorMessage: string | null = null;

  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    
    this.authService.login(rawForm.email, rawForm.password).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.errorMessage = err.code;
      }
    });
  }

  // Method to show or hide the cart
  showPanier(e: boolean) {
    this.displayPanier = e;
  }
}
