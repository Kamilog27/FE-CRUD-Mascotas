import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-agregar-editar-mascota',
  templateUrl: './agregar-editar-mascota.component.html',
  styleUrls: ['./agregar-editar-mascota.component.css']
})
export class AgregarEditarMascotaComponent {
  loading:boolean=false;
  form:FormGroup;
  id:number;
  operacion:string='';
  constructor(private fb:FormBuilder,private mascotaService:MascotaService,
    private _snackBar: MatSnackBar,private router:Router,private activatedRoute:ActivatedRoute){
    this.id=+this.activatedRoute.snapshot.paramMap.get('id')!;
    
    this.form=this.fb.group({
      nombre:['',Validators.required],
      raza:['',Validators.required],
      color:['',Validators.required],
      edad:['',Validators.required],
      peso:['',Validators.required]
    })
    if(this.id!=0){
      this.operacion='Editar';
      this.obtenerMascota(this.id);
    }
    else{
      this.operacion='Agregar';
      
    }
  }
  obtenerMascota(id:number){
    this.loading=true;
    this.mascotaService.getMascota(id).subscribe(data=>{
      this.loading=false;
      this.form.patchValue({
        nombre:data.nombre,
        raza:data.raza,
        color:data.color,
        edad:data.edad,
        peso:data.peso
      })

    })
  }
  
  agregarEditarMascota(){
    const mascota:Mascota={
      nombre:this.form.value.nombre,
      raza:this.form.value.raza,
      color:this.form.value.color,
      edad:this.form.value.edad,
      peso:this.form.value.peso
    }
    if(this.id!=0){
      mascota.id=this.id;
      this.editarMascota(this.id,mascota);
    }else{
      this.agregarMascota(mascota);
    }
  }
  editarMascota(id:number,mascota:Mascota){
    this.loading=true;
    this.mascotaService.updateMascota(id,mascota).subscribe(()=>{
      this.mensajeExito("Actualizada");
      this.loading=false;
      this.router.navigateByUrl('/listMascotas');
    });
  }
  agregarMascota(mascota:Mascota){
    this.mascotaService.addMascota(mascota).subscribe(data=>{
      
      this.mensajeExito("Registrada");
      this.router.navigateByUrl('/listMascotas');

    })
  }
  mensajeExito(texto:string){
    this._snackBar.open(`La Mascota fue ${texto} con exito`,'',{
      duration:4000,
      horizontalPosition:'right'
    });
   }
}
