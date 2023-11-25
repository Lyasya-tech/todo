import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentItemComponent } from './assignment-item.component';

describe('AssignmentItemComponent', () => {
  let component: AssignmentItemComponent;
  let fixture: ComponentFixture<AssignmentItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignmentItemComponent]
    });
    fixture = TestBed.createComponent(AssignmentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
