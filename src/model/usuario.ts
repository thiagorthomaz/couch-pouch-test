export class Usuario {
  id : string;
  nome:string;
  idade: string;
  foto: string;


  constructor();
  constructor (id?:string, nome?:string, address?:string, idade?:string,foto?:string);
  constructor (id?:string, nome?:string, address?:string, idade?:string,foto?:string) {
    this.id = id;
    this.nome = nome;
    this.idade = idade;
    this.foto = foto;
  }

}