import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaLibroComponent } from './tabla-libro.component';

describe('TablaLibroComponent', () => {
  let component: TablaLibroComponent;
  let fixture: ComponentFixture<TablaLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaLibroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
