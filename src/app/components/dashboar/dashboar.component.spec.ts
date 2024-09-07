import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboarComponent } from './dashboar.component';

describe('DashboarComponent', () => {
  let component: DashboarComponent;
  let fixture: ComponentFixture<DashboarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboarComponent]
    });
    fixture = TestBed.createComponent(DashboarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
