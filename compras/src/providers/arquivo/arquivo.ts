import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Item } from 'ionic-angular';

@Injectable()
export class ArquivoProvider {

  constructor(public storage: Storage) { 
    this.addLimite(0);
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

  addLimite (valor) {
    return new Promise (resolve => {
      var limite = {
        nome: "limite",
        valor: valor,
        chave: "x"
      };
      this.storage.set("x", limite).then(data => resolve());
    })    
  }

  getLimite(){
    return this.storage.get("x");
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
    return new Promise (resolve => {
      var lista = [];
      var lista_comprado = [];
      var lista_fila = [];
      this.storage.forEach( (element, key) => {
        if (key!="x") {
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
        }      
      });
      resolve ({
        total: lista,
        comprado: lista_comprado,
        fila: lista_fila
      });
    });
    
  }

  getGasto() {
    return new Promise (resolve => {
      var gasto = 0;
      this.storage.forEach( (element, key) => {
        if (key!="x" && element.valor!=""){
          gasto += Number(element.valor);
        }
      }).then(data => resolve(gasto));
    });
  }

  limpar(){
    var limite = this.storage.get("x");
    this.storage.clear();
    this.storage.set("x", limite);
  }

}
