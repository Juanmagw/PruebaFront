import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  ObservableInput,
  Subject,
  from,
  fromEvent,
  map,
} from 'rxjs';
import { Imagen } from '../models/Imagen';

@Injectable({
  providedIn: 'root',
})
export class ImagenService {
  key = 'zdUP8ElJv1cehFM0rsZVSQN7uBVxlDnu4diHlLSb';
  /* date = '2020-09-15'; */
  url = '';

  datos: Imagen[] = [];

  datos$ = from(this.datos);

  image: Imagen = {
    date: '',
    url: '',
    title: '',
  };
  dateAccquired: string = '';

  constructor(private http: HttpClient) {}

  getImage(startDate: string, endDate?: string): Observable<any> {
    endDate = new Date().toLocaleDateString('fr-CA');
    return this.http.get(
      (this.url =
        'https://api.nasa.gov/planetary/apod?api_key=' +
        this.key +
        '&start_date=' +
        startDate +
        '&end_date=' +
        endDate)
    );
  }

  getData(image: Imagen) {
    this.image = image;
    this.dateAccquired = image.date;
  }

  getImageByDate(): Observable<any> {
    return this.http.get(
      (this.url =
        'https://api.nasa.gov/planetary/apod?api_key=' +
        this.key +
        '&date=' +
        this.dateAccquired)
    );
  }
}
