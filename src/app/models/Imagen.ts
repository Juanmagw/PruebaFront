export class Imagen {
  date: string;
  url: string;
  title: string;
  explanation?: string;

  constructor(date: string, url: string, title: string) {
    this.date = date;
    this.url = url;
    this.title = title;
  }
}
