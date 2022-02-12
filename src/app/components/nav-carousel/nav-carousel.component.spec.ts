import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavCarouselComponent } from './nav-carousel.component';

describe('NavCarouselComponent', () => {
  let component: NavCarouselComponent;
  let fixture: ComponentFixture<NavCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
