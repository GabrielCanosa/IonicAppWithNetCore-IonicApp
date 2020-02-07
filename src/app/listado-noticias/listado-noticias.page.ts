import { Component, OnInit } from '@angular/core';
import { NoticiaService } from '../services/noticia-service.service';
import { Noticia } from '../models/noticia.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-noticias',
  templateUrl: './listado-noticias.page.html',
  styleUrls: ['./listado-noticias.page.scss'],
})
export class ListadoNoticiasPage implements OnInit {
  noticias:Noticia[] = [];

  constructor(private noticiaService:NoticiaService, private routing:Router) { }

  ngOnInit() {
    this.noticiaService.verNoticias().subscribe((noticia) => {
      this.noticias = noticia;
    }, (error)=> console.log(error))
  }

  verDetalle(noticia:Noticia){
    this.routing.navigate(['/noticia-detalle', {noticia:JSON.stringify(noticia)}])
  }

  Editar(noticia:Noticia){
    this.routing.navigate(['/agregar', {noticia:JSON.stringify(noticia)}])
  }

}
