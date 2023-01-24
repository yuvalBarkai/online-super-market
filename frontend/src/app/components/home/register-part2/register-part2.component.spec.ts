import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPart2Component } from './register-part2.component';

describe('RegisterPart2Component', () => {
  let component: RegisterPart2Component;
  let fixture: ComponentFixture<RegisterPart2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPart2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
