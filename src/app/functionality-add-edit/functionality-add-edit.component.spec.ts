import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalityAddEditComponent } from './functionality-add-edit.component';

describe('FunctionalityAddEditComponent', () => {
  let component: FunctionalityAddEditComponent;
  let fixture: ComponentFixture<FunctionalityAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionalityAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunctionalityAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
