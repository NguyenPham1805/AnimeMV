import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnNavCarouselComponent } from './btn-nav-carousel.component';

describe('BtnNavCarouselComponent', () => {
  let component: BtnNavCarouselComponent;
  let fixture: ComponentFixture<BtnNavCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnNavCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnNavCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
