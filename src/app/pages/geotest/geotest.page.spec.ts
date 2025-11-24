import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeotestPage } from './geotest.page';

describe('GeotestPage', () => {
  let component: GeotestPage;
  let fixture: ComponentFixture<GeotestPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GeotestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
