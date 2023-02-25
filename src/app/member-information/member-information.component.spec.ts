import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberInformationComponent } from './member-information.component';

describe('MemberInformationComponent', () => {
  let component: MemberInformationComponent;
  let fixture: ComponentFixture<MemberInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
