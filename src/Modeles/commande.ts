

import { LignePanier } from './LignePanier'; 

export interface Commande {
  idUser: number;
  date: string; 
  total: number; 
  items: LignePanier[]; 
  status: string; 
}

  