import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Noticia } from '../models/noticia.models';
import { Autor } from '../models/autor.models';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  constructor(private _httpClient:HttpClient) { }

  verNoticias():Observable<Noticia[]>{
    return this._httpClient.get<Noticia[]>("https://localhost:44336/api/Noticia/ObtenerNoticias")
  }

  ObtenerAutores():Observable<Autor[]>{
    return this._httpClient.get<Autor[]>("https://localhost:44336/api/Noticia/ObtenerAutores")
  }

  Eliminar(noticiaID:number):Observable<Boolean>{
    return this._httpClient.get<boolean>("https://localhost:44336/api/Noticia/Eliminar/" + noticiaID)
  }

  Guardar(noticia:Noticia):Observable<Boolean>{
    return this._httpClient.post<boolean>("https://localhost:44336/api/Noticia/Agregar", noticia)
  }

  Editar(noticia:Noticia):Observable<Boolean>{
    return this._httpClient.put<boolean>("https://localhost:44336/api/Noticia/Editar", noticia)
  }
}
