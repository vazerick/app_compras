import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Item, reorderArray } from 'ionic-angular';
import { findLast } from '@angular/compiler/src/directive_resolver';

@Injectable()
export class ArquivoProvider {

  teste:string;
  lista:Array<{
    nome: string,
    valor: number,
    vezes: number,
    chave: string,
  }>;
  limite:number;

  constructor(public storage: Storage) {     
    // this.addLimite(0);
    this.teste = "Teste de Provider";
    this.lista = [];
    this.limite = 0;
    this.atualiza();
  }

  atualiza() {
    return new Promise<{
      limite: number,
      lista: Array<any>
    }> (resolve => {
      let lista: Array<any> = [];
      let limite: number = 0;
      this.storage.forEach( (element, key) => {
        console.log("Atualiza:",key,element);
        if (key!='x') {
          lista.push({
            nome: element.nome,
            vezes: element.vezes,
            valor: element.valor,
            chave: key
          })
        } else {
          limite = element.valor;
        }
      }).then(data => {
        this.lista = lista;
        this.limite = limite;
        resolve({
          limite: limite,
          lista: lista
        });
      });
    })
  }

  geraChave(chave: string){
    return new Promise<string>( resolve => {
      while (chave.length < 3) chave = "0" + chave;
      resolve (chave);
    });
  }

  adicionar(item) {
    return new Promise (resolve => {
      this.storage.length().then( num_arquivo => {
        let chave = (num_arquivo-1).toString();
        this.geraChave(chave).then(data => {
          this.storage.set(data,
            {
              nome: item.nome,
              valor: item.valor,
              vezes: item.vezes,
            }).then(data => {
              this.atualiza();
              resolve (data);
          });
        });
      });
    })
  }

  gravar(){
    return new Promise(resolve => {
      this.lista.forEach( (value, index: number) => {
        this.geraChave(index.toString()).then(data => {
          value.chave = data;
          this.storage.set(data , value);
        });
      });
    });
  }

  reordena(ev){
    reorderArray(this.lista,ev);
    this.limpar();
    this.gravar().then(data => this.atualiza().then(data => console.log((this.lista))));
  }

  editar(item, nome, valor, vezes){
    return new Promise (resolve => {
      if (item.valor == undefined) {
        item.valor="";
      }
      let novo = {
        nome: nome,
        valor: valor,
        chave: item.chave,
        vezes: vezes
      };
      this.storage.set(item.chave, novo).then(data => this.atualiza());
    })
  }

  remove(item){
    this.storage.remove(item.chave).then(data => this.atualiza());
  }


  // return new Promise<{
  //     total: Array<any>,
  //     comprado: Array<any>
  //     fila: Array<any>
  //   }> (resolve => {
  //     var lista = [];
  //     var lista_comprado = [];
  //     var lista_fila = [];
  //     this.storage.forEach( (element, key) => {
  //       if (key!="x") {
  //         if (element.valor == ""){
  //           lista_fila.push({          
  //             nome: element.nome,
  //             vezes: element.vezes,
  //             chave: key
  //           });
  //         } else {
  //           lista_comprado.push({
  //             nome: element.nome,
  //             valor: element.valor,
  //             vezes: element.vezes,
  //             chave: key
  //           });
  //         };
  //         lista.push({
  //           nome: element.nome,
  //           valor: element.valor,
  //           vezes: element.vezes,
  //           chave: key
  //         });
  //       }      
  //     });
  //     resolve ({
  //       total: lista,
  //       comprado: lista_comprado,
  //       fila: lista_fila
  //     });
  //   });
    
  // }
  add(item) {
    return new Promise (resolve => {
      this.storage.length().then( num_arquivo => {
        let chave = (num_arquivo-1).toString();
        while (chave.length < 3) chave = "0" + chave;
        this.storage.set(chave,
          {
            nome: item.nome,
            valor: item.valor,
            vezes: item.vezes,            
          });
        resolve (chave);
      });
    })
    
  }
                   

  salva(lista: Array<any>) {    
    this.limpar();
    lista.forEach( (value: string, index: number) => {
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
        chave: "x",
        vezes: "0"
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
        valor: valor,
        chave: item.chave,
        vezes: item.vezes
      };
      this.storage.set(item.chave, novo).then(data => resolve(novo));
    })
  }

  getLista() {
    // return "get Lista"
    return new Promise<{
      total: Array<any>,
      comprado: Array<any>
      fila: Array<any>
    }> (resolve => {
      var lista = [];
      var lista_comprado = [];
      var lista_fila = [];
      this.storage.forEach( (element, key) => {
        if (key!="x") {
          if (element.valor == ""){
            lista_fila.push({          
              nome: element.nome,
              vezes: element.vezes,
              chave: key
            });
          } else {
            lista_comprado.push({
              nome: element.nome,
              valor: element.valor,
              vezes: element.vezes,
              chave: key
            });
          }
          lista.push({
            nome: element.nome,
            valor: element.valor,
            vezes: element.vezes,
            chave: key
          });
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
    return new Promise<number>(resolve => {
      var gasto = 0;
      this.storage.forEach( (element, key) => {
        if (key!="x" && element.valor!=""){
          gasto += Number(element.valor)*Number(element.vezes);
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
