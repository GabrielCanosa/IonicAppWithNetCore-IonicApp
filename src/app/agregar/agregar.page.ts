import { Component, OnInit } from '@angular/core';
import { Autor } from '../models/autor.models';
import { NoticiaService } from '../services/noticia-service.service';
import { Noticia } from '../models/noticia.models';
import { LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  autores:Autor[] = [];
  noticia:Noticia = new Noticia();
  esEditable:boolean = false;


  constructor(private noticiaService:NoticiaService, 
              public loadingController: LoadingController,
              public toastController: ToastController,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    if(this.activatedRoute.snapshot.params.noticia != undefined){
      this.noticia= new Noticia(JSON.parse(this.activatedRoute.snapshot.params.noticia));
      this.esEditable = true;
    }

    this.noticiaService.ObtenerAutores().subscribe((autores) => {
      this.autores = autores;
    }, (error)=> console.log(error))
  }

  async Agregar(noticia:Noticia){
    const loading = await this.loadingController.create({
      message: 'Guardando noticia'
    });
    await loading.present();

    this.noticiaService.Guardar(noticia).subscribe((result) => {
      this.noticia = new Noticia(null); // limpia los campos
      loading.dismiss();
      this.MostrarMensaje('La noticia se guardo correctamente!')
    }, (error)=> {
      this.MostrarMensaje('Ocurrió un error')
      loading.dismiss();
      console.log(error)
    })
  }

  async Editar(noticia:Noticia){
    const loading = await this.loadingController.create({
      message: 'Editando noticia'
    });
    await loading.present();

    this.noticiaService.Editar(noticia).subscribe((result) => {
      this.noticia = new Noticia(null); // limpia los campos
      loading.dismiss();
      this.MostrarMensaje('La noticia se editó correctamente!')
    }, (error)=> {
      this.MostrarMensaje('Ocurrió un error')
      loading.dismiss();
      console.log(error)
    })
  }

  async MostrarMensaje(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

}
