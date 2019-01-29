import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Item } from 'ionic-angular';

@Injectable()
export class ArquivoProvider {

  constructor(public storage: Storage) { 
  }

  salva(lista: Array<any>) {
    this.limpar();
    lista.forEach( (value: string, index: number) => {
      console.log(value, ": ", index)
      var chave: string;
      chave = index.toString();
      while (chave.length < 3) chave = "0" + chave;
      this.storage.set(chave , value);
    });
    
  }

  addValor(item, valor) {
    return new Promise (resolve => {
      var novo = {
        nome: item.nome,
        valor: valor
      };
      this.storage.set(item.chave, novo).then(data => resolve());
    })
  }

  getLista() {
    // return "get Lista"
    var lista = [];
    var lista_comprado = [];
    var lista_fila = [];
    this.storage.forEach( (element, key) => {            
      if (element.valor == ""){
        lista_fila.push({          
          nome: element.nome,
          chave: key
        });
      } else {
        lista_comprado.push({
          nome: element.nome,
          valor: element.valor,
          chave: key
        });
      };
      lista.push({
        nome: element.nome,
        valor: element.valor,
        chave: key
      })
    });
    return {
      total: lista,
      comprado: lista_comprado,
      fila: lista_fila
    };
  }

  // if (item.valor == "") {
  //   console.log("Inicio do if Fila");
  //   console.log("Fila:", item)
  //   this.lista_fila.push({
  //     nome: item.nome, 
  //     valor: "",
  //   });        
  //   console.log("Lista fila:", this.lista_fila);        
  //   console.log("Fim do if Fila");
  // } else {
  //   console.log("Comprado");
  //   this.lista_comprado.push({
  //     nome: item.nome,
  //     valor: item.valor
  //   });
  // }


  limpar(){
    this.storage.clear();
  }

}
