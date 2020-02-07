import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Noticia } from '../models/noticia.models';
import { NoticiaService } from '../services/noticia-service.service';
import { error } from 'protractor';

@Component({
  selector: 'app-noticia-detalle',
  templateUrl: './noticia-detalle.page.html',
  styleUrls: ['./noticia-detalle.page.scss'],
})
export class NoticiaDetallePage implements OnInit {
  noticiaDet:Noticia;

  constructor(private state:ActivatedRoute, private noticiaService:NoticiaService) { }

  ngOnInit() {
    this.noticiaDet = JSON.parse(this.state.snapshot.params.noticia)
  }

  Eliminar(noticiaID){
    this.noticiaService.Eliminar(noticiaID).subscribe(() =>{
      console.log('bien')
    }), error=> {
      console.log(error)
    }
  }

}
