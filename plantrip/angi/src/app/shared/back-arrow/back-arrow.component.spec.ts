/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BackArrowComponent } from './back-arrow.component';

describe('BackArrowComponent', () => {
  let component: BackArrowComponent;
  let fixture: ComponentFixture<BackArrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackArrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
