import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarblesComponent } from './marbles.component';

describe('MarblesComponent', () => {
  let component: MarblesComponent;
  let fixture: ComponentFixture<MarblesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarblesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
