import { TestBed } from '@angular/core/testing';

import { TaskPdfService } from './task-pdf.service';

describe('TaskPdfService', () => {
  let service: TaskPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
