import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInforFriendComponent } from './view-infor-friend.component';

describe('ViewInforFriendComponent', () => {
  let component: ViewInforFriendComponent;
  let fixture: ComponentFixture<ViewInforFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInforFriendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInforFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
