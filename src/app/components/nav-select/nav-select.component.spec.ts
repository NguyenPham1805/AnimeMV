import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavSelectComponent } from './nav-select.component';

describe('NavSelectComponent', () => {
  let component: NavSelectComponent;
  let fixture: ComponentFixture<NavSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
