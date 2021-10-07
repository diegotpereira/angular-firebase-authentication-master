import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscreverSeComponent } from './inscrever-se.component';

describe('InscreverSeComponent', () => {
  let component: InscreverSeComponent;
  let fixture: ComponentFixture<InscreverSeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscreverSeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscreverSeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
