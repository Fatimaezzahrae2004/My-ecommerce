

import { LignePanier } from './LignePanier'; 

export interface Commande {
  id: number;
  date: string; 
  total: number; 
  items: LignePanier[]; 
  status: string; 
}

  