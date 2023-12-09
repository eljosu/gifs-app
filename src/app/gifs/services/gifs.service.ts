import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifsList: Gif[]= [];

  private _tagsHistory: string[] = [];
  private apiKey:       string = '4ay2DdO9vWqyNSRsaXCmy0pPG771eDgK';
  private serviceUrl:   string = 'https://api.giphy.com/v1/gifs'

  constructor( private http: HttpClient) {
    this.loadLocalStorage();
    // this.searchTag(this.tagsHistory[0])
    console.log('Gifs Service Ready');
   }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag= tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory= this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory= this.tagsHistory.splice(0,10);
    this.saveLocalStorage();

  }

  //Para guardar historial de busquedas y gifs, tenemos que pasar los datos a Local Storage
  //Hay que pasarlo como string, con JSON.stringfy

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;

    this._tagsHistory= JSON.parse(localStorage.getItem('history')!);
    //Aqui abajo o en el constructor
    if(this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);

  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params= new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 12)
      .set('q', tag)

    //Para que quede mas limpio, en vez de poner:
    //'https://api.giphy.com/v1/gifs/search?api_key=4ay2DdO9vWqyNSRsaXCmy0pPG771eDgK&q=batman&limit=10'
    //declaramos antes la url y los parametros de la busqueda
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
      .subscribe( resp => {

        this.gifsList = resp.data;
        console.log({gifs: this.gifsList});
      });
  }

}

// Primero giphydevelopers y al crear app nos da el apiKey que debemos copiar y pegar aqui
//Despues en giphydevelopers quickstart guide nos indica parametros que podemos usar, y tambien nos pone Gif URL, que debemos copiar aqui tambien, y en postman, pero en vez de /trending ponemos /search
//Despues de search ponemos ? porque vamos a introducir el api_key como parametro
//Se anade como parametro q de query, y como Value lo que queremos buscar
//Poner de parametro limit y value 10 o 12, o los que queramos mostrar

    //Para hacer peticion HTTP, pegar url de postman con parametros de busqueda
    //Se puede poniendo .then despues del fetch, porque es una promesa
    //O se puede en searchTag poner async y cnvertirlo en promesa:
    //async searchTag(tag: string): Promise<void> {

  //   fetch('https://api.giphy.com/v1/gifs/search?api_key=4ay2DdO9vWqyNSRsaXCmy0pPG771eDgK&q=batman&limit=10')
  //     .then( resp => resp.json())
  //     .then( data => console.log(data));


  //Tambien se puede:
  // const resp = await fetch(........)
  // const data = await resp.json();
  // console.log(data);

  //Mejor no usaremos el fetch, porque el fetch una vez que se activa no se puede cancelar
  //Mejor usar suscribers

  //Lo haremos con suscribers, pero para ello hay que anadir HttpClientModule a app.module. Se importa desde @angular/common/http. Se pone en imports
  //Despues importar aqui y poner en el constructor HttpClient.
  //Luego para anadir los params usamos HttpParams, y se importa. Viene incorporado al haber anadido HttpClient

  //Para mapeo de la respuesta, y convertirlo a interfaces, copiar la respuesta de la busqueda en Postman, y en quicktype.io
  //Para tipar rapido algo. Pegamos la respuesta de Postman
  //El resultado cambiarlo de Swift a TypeScript, y pulsar la opcion Interfaces.
  //

