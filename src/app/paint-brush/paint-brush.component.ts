import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { tap, switchMap, map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-paint-brush',
  templateUrl: './paint-brush.component.html',
  styleUrls: ['./paint-brush.component.css']
})
export class PaintBrushComponent implements OnInit {

  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  private context: CanvasRenderingContext2D;

  private move: Observable<Event>;
  private click: Observable<Event>;
  private leave: Observable<Event>;

  private lineWidth = 1;
  private lineColor = 'black';

  constructor() { }

  ngOnInit() {
    this.context = this.canvas.nativeElement.getContext('2d');

    this.move = fromEvent(this.canvas.nativeElement, 'mousemove');
    this.click = fromEvent(this.canvas.nativeElement, 'mousedown');
    this.leave = fromEvent(document, 'mouseup');

    this.draw()
      .subscribe(coords => {
        this.context.lineWidth = this.lineWidth;
        this.context.strokeStyle = this.lineColor;
        this.context.lineTo(coords.x, coords.y);
        this.context.stroke();
      });
  }

  public draw() {
    return this.click
      .pipe(
        tap(
          (event: MouseEvent) => {
            this.context.beginPath();
            this.context.moveTo(event.offsetX, event.offsetY);
          }
        ),
        switchMap(
          () => this.move.pipe(
            map((event: MouseEvent) => {
              return { x: event.offsetX, y: event.offsetY };
            }),
            takeUntil(this.leave)
          )
        )
      );
  }

  public changeLineWidth(width: number) {
    this.lineWidth = width;
  }

  public changeLineColor(color: string) {
    this.lineColor = color;
  }
}
