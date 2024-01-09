import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePatientComponent } from './update-patient.component';

describe('UpdatePatientComponent', () => {
  let component: UpdatePatientComponent;
  let fixture: ComponentFixture<UpdatePatientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePatientComponent]
    });
    fixture = TestBed.createComponent(UpdatePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
