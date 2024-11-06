import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Commande } from '../../Modeles/commande';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LignePanier } from '../../Modeles/LignePanier';
@Injectable({
  providedIn: 'root'
})
export class CommandeService {
 
  private commandesCollection: AngularFirestoreCollection<Commande>;
  commandes$: Observable<Commande[]>;

  constructor(private firestore: AngularFirestore) {
    
    this.commandesCollection = this.firestore.collection<Commande>('commandes');

    
    this.commandes$ = this.commandesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Commande;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

 
  getCommandes(): Observable<Commande[]> {
    return this.commandes$;
  }

  
  async validateCommande(panierItems: LignePanier[], total: number): Promise<void> {
    const newCommande: Commande = {
      idUser: Date.now(), 
      date: new Date().toISOString(),
      total: total,
      status: 'Validée',
      items: panierItems
    };

    
    await this.commandesCollection.add(newCommande);
  }
}
