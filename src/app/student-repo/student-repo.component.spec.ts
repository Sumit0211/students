import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRepoComponent } from './student-repo.component';

describe('StudentRepoComponent', () => {
  let component: StudentRepoComponent;
  let fixture: ComponentFixture<StudentRepoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentRepoComponent]
    });
    fixture = TestBed.createComponent(StudentRepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
