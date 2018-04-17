import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {


  public usuarios : any;
  searchInput : string;

  constructor(public navCtrl: NavController, public usuarioService:UsuarioProvider) {

    this.usuarios = this.usuarioService.getUsuario();
    /*this.usuarioService.getUsuario().then((data) => {
      this.usuarios= data;
    });*/


  }

  public searchUser(_event){
    
    console.log(_event);

    this.usuarioService.searchUsuario(_event).then(resultado=> this.usuarios = resultado.docs);

  }

}
