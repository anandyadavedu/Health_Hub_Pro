import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRecordComponent } from './patient-record.component';

describe('PatientRecordComponent', () => {
  let component: PatientRecordComponent;
  let fixture: ComponentFixture<PatientRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientRecordComponent]
    });
    fixture = TestBed.createComponent(PatientRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
