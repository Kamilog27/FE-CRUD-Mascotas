import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-ver-mascota',
  templateUrl: './ver-mascota.component.html',
  styleUrls: ['./ver-mascota.component.css']
})
export class VerMascotaComponent {

  id!:number;
  mascota!:Mascota;
  loading:boolean=false;
constructor(private mascotaService:MascotaService,private activatedroute:ActivatedRoute){
  // this.id=+this.activatedroute.snapshot.paramMap.get('id')!;
  this.activatedroute.params.subscribe(data=>{
    this.id=data['id'];
    this.obtenerMascota();
  })
}
obtenerMascota(){
  this.loading=true;
  this.mascotaService.getMascota(this.id).subscribe(data=>{
    this.mascota=data;
    this.loading=false;
  })
}
}
