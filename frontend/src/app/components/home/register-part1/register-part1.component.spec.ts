import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPart1Component } from './register-part1.component';

describe('RegisterPart1Component', () => {
  let component: RegisterPart1Component;
  let fixture: ComponentFixture<RegisterPart1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPart1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPart1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
