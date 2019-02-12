import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'pipePreco'})
export class pipePreco implements PipeTransform{
  transform(val) {
    let decimais:number = 2;
    let separador:string = ".";
    let a:any = val.toString().split('');
    let ns:string = '';
    a.forEach((c:any) => { if (!isNaN(c)) ns = ns + c; });
    ns = parseInt(ns).toString();
    if (ns.length < (decimais+1)) { ns = ('0'.repeat(decimais+1) + ns); ns = ns.slice((decimais+1)*-1); }
    let ans = ns.split('');
    let r = '';
    for (let i=0; i < ans.length; i++) if (i == ans.length - decimais) r = r + separador + ans[i]; else r = r + ans[i];
    val = r;
    return val;
  }

}