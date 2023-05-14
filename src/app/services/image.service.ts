import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from '../models/Image';
import { Observable, Subject, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  key = 'zdUP8ElJv1cehFM0rsZVSQN7uBVxlDnu4diHlLSb';
  /* date = '2020-09-15'; */
  url = '';

  data = new Subject<Image>();

  data$ = from(this.data);

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

  setData(data: Image) {
    this.data.next(data);
  }
}
