import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ListeproduitComponent } from "./listeproduit/listeproduit.component";
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AuthService } from './services/auth.service';
import { User } from '@angular/fire/auth'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterModule,  
    ListeproduitComponent, 
    NavBarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.user$.subscribe((user: User | null) => {  
      if (user) {
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
        });
      } else {
        this.authService.currentUserSig.set(null);
      }

      console.log(this.authService.currentUserSig());  
    });
  }
}
