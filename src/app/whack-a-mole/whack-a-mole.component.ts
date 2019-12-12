import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Coords } from './coords.interface';
import { interval, fromEvent, Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-whack-a-mole',
  templateUrl: './whack-a-mole.component.html',
  styleUrls: ['./whack-a-mole.component.css']
})
export class WhackAMoleComponent implements OnInit {

  public moles: Coords[] = [];

  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  private context: CanvasRenderingContext2D;

  private readonly MOLE_SIZE = 50;
  private readonly LIMIT = 400;

  public score = 0;

  public loser = false;
  public winner = false;

  private whack: Observable<Event>;

  constructor() { }

  ngOnInit() {
    this.whack = fromEvent(this.canvas.nativeElement, 'click');
    this.context = this.canvas.nativeElement.getContext('2d');

    interval(500)
      .pipe(takeWhile(() => !this.loser && !this.winner))
      .subscribe(
        () => {
          const mole = this.generateMole();
          this.moles.push(mole);
          this.drawMole(mole.x, mole.y);

          if (this.isLoser()) {
            this.loseGame();
          }
        }
      );

    this.whack
      .subscribe(
        (event: MouseEvent) => {
          const mole = this.findMole(event.offsetX, event.offsetY);
          if (mole) {
            this.whackMole(mole.x, mole.y);
            this.moles.splice(this.moles.indexOf(mole), 1);

            if (this.isWinner()) {
              this.winGame();
            }
          }
        });
  }

  private generateMole(): Coords {
    return {
      x: Math.floor(Math.random() * (this.LIMIT - (this.MOLE_SIZE / 2))),
      y: Math.floor(Math.random() * (this.LIMIT - (this.MOLE_SIZE / 2)))
    };
  }

  private drawMole(x: number, y: number) {
    this.context.fillStyle = 'black';
    this.context.fillRect(x, y, (this.MOLE_SIZE / 2), (this.MOLE_SIZE / 2));
  }

  private whackMole(x: number, y: number) {
    this.context.fillStyle = 'white';
    this.context.fillRect(x, y, (this.MOLE_SIZE / 2), (this.MOLE_SIZE / 2));
    this.score += 100;
  }

  private findMole(x: number, y: number): Coords {
    const foundMole = this.moles.find(mole => {
      return (x >= mole.x && x <= (mole.x + 25))
        && (y >= mole.y && y <= (mole.y + 25));
    });

    return foundMole;
  }

  public isWinner(): boolean {
    return this.score >= 10000;
  }

  private winGame() {
    this.context.clearRect(0, 0, this.LIMIT, this.LIMIT);
    this.moles = [];
    this.winner = true;
  }

  public isLoser(): boolean {
    return this.moles.length >= 20;
  }

  private loseGame() {
    this.context.clearRect(0, 0, this.LIMIT, this.LIMIT);
    this.moles = [];
    this.loser = true;
  }
}
