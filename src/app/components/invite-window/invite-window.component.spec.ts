import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteWindowComponent } from './invite-window.component';

describe('InviteWindowComponent', () => {
  let component: InviteWindowComponent;
  let fixture: ComponentFixture<InviteWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
