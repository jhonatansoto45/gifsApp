import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Data } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'p9c9ASgg9LNU0CeyrE93C8UO9SKXp7UT';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  resultados: Data[] = [];

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  get historial() {
    //* Rompe la referencia
    return [...this._historial];
  }

  buscarGifs(query: string) {
    query = query.trim().toLowerCase();
    //* No repetir datos en el array
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    //* Parametros de http
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http
      .get<SearchGifsResponse>(`${this.servicioUrl}/search`, {
        params,
      })
      .subscribe((response: SearchGifsResponse) => {
        this.resultados = response.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }
}
