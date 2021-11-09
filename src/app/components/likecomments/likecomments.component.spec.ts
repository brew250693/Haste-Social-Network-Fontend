import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikecommentsComponent } from './likecomments.component';

describe('LikecommentsComponent', () => {
  let component: LikecommentsComponent;
  let fixture: ComponentFixture<LikecommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikecommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikecommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
