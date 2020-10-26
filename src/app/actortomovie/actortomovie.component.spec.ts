import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActortomovieComponent } from './actortomovie.component';

describe('ActortomovieComponent', () => {
  let component: ActortomovieComponent;
  let fixture: ComponentFixture<ActortomovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActortomovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActortomovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
