import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Imagen } from 'src/app/models/Imagen';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  image: Imagen = {
    url: '',
    date: '',
    title: '',
    explanation: '',
  };
  constructor(private _imageService: ImagenService) {}

  ngOnInit(): void {
    /*     this._imageService.getImage(date.toLocaleDateString('fr-CA'))
     */ this._imageService
      .getImageByDate()
      .pipe(
        map((data) => {
          this.image = data;
        })
      )
      .subscribe();
  }
}
