import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestFrameComponent } from './suggest-frame.component';

describe('SuggestFrameComponent', () => {
  let component: SuggestFrameComponent;
  let fixture: ComponentFixture<SuggestFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestFrameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
