import { pipe, of, OperatorFunction } from 'rxjs';
import { mergeMap, concatMap, delay } from 'rxjs/operators';

export function dataByPeriod(period: number = 1000): OperatorFunction<any, any> {
    return pipe(
        mergeMap((data: any) => of(...data)),
        concatMap(data => of(data).pipe(delay(period)))
    );
}
