import { BdService } from '../../Services/bd.service';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Item } from 'src/Models/item';
import { FormsModule } from "@angular/forms";;
import { CommonModule } from '@angular/common';
import { Animal } from '../comida';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule,FormsModule,CommonModule],
})
export class HomePage {
  private enlace:string = 'Alimentos';
  comida: Animal[]=[]
  
 
  constructor(private bd:BdService) {
  }
  ngOnInit() {
    this.bd.get<Animal>(this.enlace).subscribe(p=>{
      this.comida=p;
    });

  }
}

