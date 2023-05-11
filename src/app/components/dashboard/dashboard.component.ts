import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, fromEvent, map, of, retry, take } from 'rxjs';
import { Imagen } from 'src/app/models/Imagen';
import { ImagenService } from 'src/app/services/imagen.service';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  listImages: Imagen[] = [];

  irDetalles$ = fromEvent<PointerEvent>(document, 'click');

  constructor(private router: Router, private _imageService: ImagenService) {}

  ngOnInit(): void {
    this.mostrarDatos();
  }

  mostrarDatos() {
    let date = new Date();
    date.setDate(date.getDate() - 5);
    this._imageService
      .getImage(date.toLocaleDateString('fr-CA'))
      .pipe(
        map((data: Imagen[], i) => {
          this.listImages = data;
          this.irDetalles$
            .pipe(
              map((event: any) => {
                if (event.target.id === 'img') {
                  console.log(this.listImages[i])
                  this._imageService.getData(this.listImages[i]); //No pilla bien el índice
                }
              })
            )
            .subscribe();
        }),
        retry(5)
      )
      .subscribe();
  }
}
