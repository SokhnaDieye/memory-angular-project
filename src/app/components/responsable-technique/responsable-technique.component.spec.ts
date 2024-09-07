import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsableTechniqueComponent } from './responsable-technique.component';

describe('ResponsableTechniqueComponent', () => {
  let component: ResponsableTechniqueComponent;
  let fixture: ComponentFixture<ResponsableTechniqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResponsableTechniqueComponent]
    });
    fixture = TestBed.createComponent(ResponsableTechniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
