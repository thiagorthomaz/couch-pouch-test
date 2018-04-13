
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Dialogs } from '@ionic-native/dialogs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public usuarios : any;
  public usuario = {nome:"", idade:"", foto: ""};
  public options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.PNG,
    mediaType: this.camera.MediaType.PICTURE
  };

  constructor(public navCtrl: NavController, public usuarioService : UsuarioProvider, public alertCtrl: AlertController, private camera:Camera, private dialogs: Dialogs) {

  }
  
  
  ionViewDidLoad() {

    this.usuarioService.getUsuario().then((data) => {
      console.log(data);
      this.usuarios= data;
    });

  }

  public uploadImagem() {
    


    
    this.camera.getPicture(this.options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.usuario.foto = base64Image;

     this.dialogs.alert('Upload realizado com sucesso')
    .then(() => console.log('Dialog dismissed'))
    .catch(e => console.log('Error displaying dialog', e));

    }, (err) => {
     // Handle error
     console.log(err);
    });


  }


  public editar(_usuario) {
    this.usuario = _usuario;
  }

  public deletar(_usuario) {
    this.usuarioService.removeUsuario(_usuario);    
  }

  public salvarUsuario() {
    this.usuarioService.createUsuario(this.usuario);    
  }

}
