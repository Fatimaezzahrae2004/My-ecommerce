import { Routes } from '@angular/router';
import { ListeproduitComponent } from './listeproduit/listeproduit.component';
import { PanierComponent } from './panier/panier.component';
import { SignupComponent } from './signup/signup.component';
import { ConnexionComponent } from './connexion/connexion.component';  
import { CommandesComponent } from './commandes/commandes.component';
// Définition des routes
export const routes: Routes = [
  { path: '', component: ListeproduitComponent },  
  { path: 'panier', component: PanierComponent },  
  { path: 'mes-commandes', component: CommandesComponent},  
  { path: 'signup', component: SignupComponent },
  { path: 'connexion', component: ConnexionComponent },  
  { path: '**', redirectTo: '' }  
];

