import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
 
@Component({
  selector: 'app-signup',
  standalone: true,
  imports:[FormsModule, RouterOutlet],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  fullName: string = '';  
  signupEmail: string = '';  
  signupPassword: string = '';  
  confirmPassword: string = '';

  onSubmitSignup() {
    if (this.signupPassword === this.confirmPassword) {
      console.log('Inscription réussie :', this.fullName, this.signupEmail);
      
    } else {
      console.log('Les mots de passe ne correspondent pas');
    }
  }
}
