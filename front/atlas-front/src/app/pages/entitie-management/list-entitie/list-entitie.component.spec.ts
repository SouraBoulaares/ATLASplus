import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEntitieComponent } from './list-entitie.component';

describe('ListEntitieComponent', () => {
  let component: ListEntitieComponent;
  let fixture: ComponentFixture<ListEntitieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEntitieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEntitieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
