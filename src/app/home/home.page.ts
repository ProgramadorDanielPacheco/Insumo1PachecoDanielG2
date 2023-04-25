import { BdService } from './../../Services/bd.service';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Item } from 'src/Models/item';
import { FormsModule } from "@angular/forms";;
import { ToastService } from 'src/Services/toast.service';
import { LoadingService } from 'src/Services/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule,FormsModule,CommonModule],
})
export class HomePage {
  private enlace:string = 'Alimentos';
  public Alimentos:Item[]=[];
  public newAlimento:Item={
    nombre: '',
    precio: '',
    calificacion: '',
    id: '',
    imagen: ''
  };
  constructor(private bd:BdService, private toast:ToastService, private load:LoadingService) {
  }
  ngOnInit() {
    this.bd.get<Item>(this.enlace).subscribe(p=>{
      this.Alimentos=p;
    });
  }
  save(){
    this.load.presentLoading();
    this.newAlimento.id=this.bd.createId(this.enlace);
    const data = this.newAlimento;
    this.bd.add<Item>(data,this.enlace,this.newAlimento.id).then(()=>{
      this.toast.showToast("Exito al guardar","success","checkbox-outline");
      this.load.dismissLoading();
      this.clean();
    }).catch(()=>{
      this.toast.showToast("Error al guardar","danger","sad-outline");
    });
  }

  delete(p:Item){
    this.load.presentLoading();
    this.bd.delete(`Personas`,p.id).then(()=>{
      this.toast.showToast("Exito al Borrar","success","trash-outline");
      this.load.dismissLoading();
    }).catch(()=>{
      this.toast.showToast("Error al Borrar","danger","sad-outline");
    });

  }

  clean(){
    this.newAlimento.id="";
    this.newAlimento.calificacion="";
    this.newAlimento.nombre="";
    this.newAlimento.precio="";
    this.newAlimento.imagen="";
    }
  }


