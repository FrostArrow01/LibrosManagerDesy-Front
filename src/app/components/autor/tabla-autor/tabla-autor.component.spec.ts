import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaAutorComponent } from './tabla-autor.component';

describe('TablaAutorComponent', () => {
  let component: TablaAutorComponent;
  let fixture: ComponentFixture<TablaAutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaAutorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
