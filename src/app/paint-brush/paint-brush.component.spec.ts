import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintBrushComponent } from './paint-brush.component';

describe('PaintBrushComponent', () => {
  let component: PaintBrushComponent;
  let fixture: ComponentFixture<PaintBrushComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaintBrushComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintBrushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.changeLineColor('blue');
    component.changeLineWidth(2);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should draw a line', () => {
    const newEmptyCanvas = document.createElement('canvas');
    newEmptyCanvas.width = 400;
    newEmptyCanvas.height = 400;

    const newEmptyCanvasContent = newEmptyCanvas.toDataURL();
    const emptyCanvasContent = component.canvas.nativeElement.toDataURL();

    component.canvas.nativeElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 85, clientY: 151 }));
    component.canvas.nativeElement.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 151 }));
    component.canvas.nativeElement.dispatchEvent(new MouseEvent('mouseup', { clientX: 100, clientY: 151 }));

    const filledCanvasContent = component.canvas.nativeElement.toDataURL();

    expect(filledCanvasContent !== newEmptyCanvasContent).toBeTruthy();
    expect(filledCanvasContent !== emptyCanvasContent).toBeTruthy();
  });

  it('should have an empty canvas', () => {
    const newEmptyCanvas = document.createElement('canvas');
    newEmptyCanvas.width = 400;
    newEmptyCanvas.height = 400;

    const newEmptyCanvasContent = newEmptyCanvas.toDataURL();
    const emptyCanvasContent = component.canvas.nativeElement.toDataURL();

    expect(emptyCanvasContent).toEqual(newEmptyCanvasContent);
  });
});
