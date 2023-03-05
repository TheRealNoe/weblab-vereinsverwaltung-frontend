import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceModifyComponent } from './resource-modify.component';

describe('ResourceModifyComponent', () => {
  let component: ResourceModifyComponent;
  let fixture: ComponentFixture<ResourceModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceModifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
