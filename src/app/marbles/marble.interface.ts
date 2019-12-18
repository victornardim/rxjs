import { MarbleDirection } from './marble-direction.enum';
import { MarbleOrder } from './marble-order.enum';

export interface Marble {
    value: number;
    direction: MarbleDirection;
    order: MarbleOrder;
}
