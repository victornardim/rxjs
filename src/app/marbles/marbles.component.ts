import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, tap, switchMap, concatMap, map, exhaustMap } from 'rxjs/operators';
import { dataByPeriod } from '../shared/data-every-second.operator';
import { Marble } from './marble.interface';
import { MarbleDirection } from './marble-direction.enum';
import { MarbleOrder } from './marble-order.enum';

@Component({
  selector: 'app-marbles',
  templateUrl: './marbles.component.html',
  styleUrls: ['./marbles.component.css']
})
export class MarblesComponent implements OnInit {

  private switchMarbles: Marble[] = [];
  private mergeMarbles: Marble[] = [];
  private concatMarbles: Marble[] = [];
  private exhaustMarbles: Marble[] = [];

  constructor() { }

  ngOnInit() {
    this.getSwitchMarbles()
      .subscribe(marble => {
        this.switchMarbles.push(marble);
      });

    this.getMergeMarbles()
      .subscribe(marble => {
        this.mergeMarbles.push(marble);
      });

    this.getConcatMarbles()
      .subscribe(marble => {
        this.concatMarbles.push(marble);
      });

    this.getExhaustMarbles()
      .subscribe(marble => {
        this.exhaustMarbles.push(marble);
      });
  }

  public getSwitchMarbles(): Observable<Marble> {
    return of([20, 20, 30, 40, 50])
      .pipe(dataByPeriod(2000),
        tap(value => {
          this.switchMarbles.push(this.getMarble(value, MarbleDirection.DOWN, MarbleOrder.GUIDE));
        }),
        switchMap(original =>
          of([1, 2, 3])
            .pipe(dataByPeriod(500),
              map(value => {
                const order = (original / 10) - 1;
                return this.getMarble(value, MarbleDirection.UP, MarbleOrder[order]);
              }))
        ));
  }

  public getMergeMarbles(): Observable<Marble> {
    return of([10, 20, 30, 40, 50])
      .pipe(dataByPeriod(1000),
        tap(value => {
          this.mergeMarbles.push(this.getMarble(value, MarbleDirection.DOWN, MarbleOrder.GUIDE));
        }),
        mergeMap(original =>
          of([1, 2, 3])
            .pipe(dataByPeriod(500),
              map(value => {
                const order = (original / 10) - 1;
                return this.getMarble(value, MarbleDirection.UP, MarbleOrder[order]);
              }))
        ));
  }

  public getConcatMarbles(): Observable<Marble> {
    return of([10, 20, 30, 40, 50])
      .pipe(dataByPeriod(1000),
        tap(value => {
          this.concatMarbles.push(this.getMarble(value, MarbleDirection.DOWN, MarbleOrder.GUIDE));
        }),
        concatMap(original =>
          of([1, 2, 3])
            .pipe(dataByPeriod(500),
              map(value => {
                const order = (original / 10) - 1;
                return this.getMarble(value, MarbleDirection.UP, MarbleOrder[order]);
              }))
        ));
  }

  public getExhaustMarbles(): Observable<Marble> {
    return of([10, 20, 30, 40, 50])
      .pipe(dataByPeriod(1000),
        tap(value => {
          this.exhaustMarbles.push(this.getMarble(value, MarbleDirection.DOWN, MarbleOrder.GUIDE));
        }),
        exhaustMap(original =>
          of([1, 2, 3])
            .pipe(dataByPeriod(500),
              map(value => {
                const order = (original / 10) - 1;
                return this.getMarble(value, MarbleDirection.UP, MarbleOrder[order]);
              }))
        ));
  }

  private getMarble(value: number, direction: MarbleDirection, order: string): Marble {
    return <Marble>{
      value,
      direction,
      order
    };
  }
}
