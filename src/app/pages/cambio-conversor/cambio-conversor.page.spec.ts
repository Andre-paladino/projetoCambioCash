import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambioConversorPage } from './cambio-conversor.page';

describe('CambioConversorPage', () => {
  let component: CambioConversorPage;
  let fixture: ComponentFixture<CambioConversorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioConversorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
