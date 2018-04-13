import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

PouchDB.plugin(PouchDBFind);


@Injectable()
export class UsuarioProvider {


  public data:any;
  public db:any;
  public remote:any;
  

  constructor() {
    
    this.db = new PouchDB("usuario");
    this.remote = "http://couchdb.thiagothomaz.com.br:5984/usuario";
    
    /**
     * Tenta se conectar com a base remota
     * se não conseguir tenta novamente
     * e continua tentando.
     */
    let options = {
      live : true,
      retry : true,
      continuous : true
    }

    this.db.sync(this.remote, options);


  }

  public searchUsuario(_nome:string) {
    console.log("Buscar: " + _nome);
    return this.db.find({
      selector: {nome: {$regex:_nome}}
    })

  }

  public updateUsuario(usuario:any) {

      this.db.put(usuario).catch( (err) => {
        console.log(err);
      } );

  }


  public removeUsuario(usuario:any) {

    this.db.remove(usuario);

}

  public createUsuario(usuario:any) {
    this.db.post(usuario);    
  }

  public getUsuario() {

    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(
      resolve => this.db.allDocs({
        include_docs:true
      }).then((result)=>{
        this.data = [];
        let docs = result.rows.map((row)=>{
          this.data.push(row.doc);
        });
        
        resolve(this.data);

        this.db.changes({live:true, since:'now', include_docs:true}).on('change', (change) => {
          this.handleChange(change);
        });

      })
    );

  }

  public handleChange(change:any) {

    let changedDoc = null;
    let changedIndex = null;

    this.data.forEach( (doc, index) => {
      if (doc._id === change.id) {
        changedDoc = doc;
        changedIndex = index;
      }
    } );


    //Documento deletado.
    if ( change.deleted ) {
      this.data.splice(changedIndex, 1);
    } else {
      
      if (changedDoc) {
        //Documento atualizado.
        this.data[changedIndex] = change.doc;
      } else {
        //Documento adicionado
        this.data.push(change.doc);
      }

    } 


  }

}
