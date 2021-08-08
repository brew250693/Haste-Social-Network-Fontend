import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendReceivedComponent } from './friend-received.component';

describe('FriendReceivedComponent', () => {
  let component: FriendReceivedComponent;
  let fixture: ComponentFixture<FriendReceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendReceivedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
