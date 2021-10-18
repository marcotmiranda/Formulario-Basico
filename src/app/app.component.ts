import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Formulario';
  newFormulario: any = FormGroup
  cep:any

constructor(private fb: FormBuilder, private http: HttpClient){

}
  ngOnInit(){
  this.formulario()

}

  formulario(){
  this.newFormulario = this.fb.group({
    cep:[''],
    rua:[''],
    cidade:[''],
    bairro:[''],
    uf:['']
  })
}
  servicos(cep:any){
     this.http.get(`${environment.baseUrl}${cep}/json`).subscribe((result: any) => {
      this.newFormulario.patchValue({
        cep: result.cep,
        rua: result.logradouro,
        cidade: result.localidade,
        bairro: result.bairro,
        uf: result.uf
      })
     })
 }
  chamaCep(){
  let cep = this.newFormulario.value.cep
  this.servicos(cep)
 }

login(){
console.log(this.newFormulario.value)

}


}
