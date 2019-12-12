import { async, ComponentFixture, TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';

import { WhackAMoleComponent } from './whack-a-mole.component';

describe('WhackAMoleComponent', () => {
  let component: WhackAMoleComponent;
  let fixture: ComponentFixture<WhackAMoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WhackAMoleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhackAMoleComponent);
    component = fixture.componentInstance;

    spyOn(Math, 'random').and.returnValue(0.2);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should win when score get to 10000', fakeAsync(() => {
    component.score = 9900;

    fixture.detectChanges();

    tick(500);

    component.canvas.nativeElement.dispatchEvent(new MouseEvent('click', { clientX: 85, clientY: 151 }));

    expect(component.winner).toBeTruthy();

    discardPeriodicTasks();
  }));

  it('should lose when get to 20 moles', fakeAsync(() => {
    fixture.detectChanges();

    tick(10000);

    expect(component.loser).toBeTruthy();

    discardPeriodicTasks();
  }));

  it('should increment score by 100 when whack a mole', fakeAsync(() => {
    fixture.detectChanges();

    tick(500);

    expect(component.score).toEqual(0);

    component.canvas.nativeElement.dispatchEvent(new MouseEvent('click', { clientX: 85, clientY: 151 }));

    expect(component.score).toEqual(100);

    discardPeriodicTasks();
  }));
});
