import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

PouchDB.plugin(PouchDBFind);



import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';



export interface Usuario {
  id : string;
  nome : string;
  idade : string;
  foto : string;
}


@Injectable()
export class UsuarioProvider {

  public usuarios : Observable<Usuario[]>;
  usuariosCollectionRef: AngularFirestoreCollection<Usuario>;

  public data:any;
  public db:any;
  public remote:any;

  constructor(public afAuth: AngularFireAuth, 
    private afs: AngularFirestore) {

      this.afAuth.auth.signInAnonymously();
      this.usuariosCollectionRef = this.afs.collection('usuarios'); 
  
      this.usuarios = this.usuariosCollectionRef.snapshotChanges().map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Usuario;
          const id = action.payload.doc.id;
          return { id, ...data };
        });
      });

  }

  public searchUsuario(_nome:string) {
    console.log("Buscar: " + _nome);
    return this.db.find({
      selector: {nome: {$regex:_nome}}
    })

  }

  public updateUsuario(usuario:Usuario) {
    this.usuariosCollectionRef.doc(usuario.id).update( usuario );
  }


  public removeUsuario(usuario:Usuario) {
    console.log("Deletando: " + usuario.id);
    this.usuariosCollectionRef.doc(usuario.id).delete();

}

  public createUsuario(usuario:Usuario) {
    delete usuario.id;
    this.usuariosCollectionRef.add( usuario ); 
  }

  public getUsuario() {
    return this.usuarios;
  }

}
