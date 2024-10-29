import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambioMapsPage } from './cambio-maps.page';

describe('CambioMapsPage', () => {
  let component: CambioMapsPage;
  let fixture: ComponentFixture<CambioMapsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioMapsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
