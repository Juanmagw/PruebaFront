import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { from, fromEvent, map, of, retry, take } from 'rxjs';
import { Image } from '../../models/Image';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  loading = false;

  listImages: Image[] = [];

  irDetalles$ = fromEvent<PointerEvent>(document, 'click');

  constructor(
    private router: Router,
    private _imageService: ImageService,
  ) {}

  ngOnInit(): void {
    this.mostrarDatos();
  }

  mostrarDatos() {
    this.loading = true;
    let date = new Date();
    date.setDate(date.getDate() - 5);
    this._imageService
      .getImage(date.toLocaleDateString('fr-CA'))
      .pipe(
        map((data: Image[]) => {
          this.loading = false;
          this.listImages = data;
          this.irDetalles$
            .pipe(
              map((event: any) => {
                if (event.target['id'] === 'img') {
                  from(this.listImages)
                    .pipe(
                      map((element) => {
                        if (event.target['currentSrc'] === element.url) {
                          this._imageService.setData(element);
                        }
                      })
                    )
                    .subscribe();
                }
              }),
              take(1)
            )
            .subscribe();
        }),
        retry(5)
      )
      .subscribe();
  }
}
