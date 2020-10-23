import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CameramanComponent } from './cameraman.component';

describe('CameramanComponent', () => {
  let component: CameramanComponent;
  let fixture: ComponentFixture<CameramanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameramanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CameramanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
