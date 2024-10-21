import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ListeproduitComponent } from "./listeproduit/listeproduit.component";
import { NavBarComponent } from './nav-bar/nav-bar.component';


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
export class AppComponent {}
