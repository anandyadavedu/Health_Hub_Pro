import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPatientComponent } from './new-patient.component';

describe('NewPatientComponent', () => {
  let component: NewPatientComponent;
  let fixture: ComponentFixture<NewPatientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewPatientComponent]
    });
    fixture = TestBed.createComponent(NewPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
