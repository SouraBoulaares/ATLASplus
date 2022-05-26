import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewEntitieComponent } from './add-new-entitie.component';

describe('AddNewEntitieComponent', () => {
  let component: AddNewEntitieComponent;
  let fixture: ComponentFixture<AddNewEntitieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewEntitieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewEntitieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
