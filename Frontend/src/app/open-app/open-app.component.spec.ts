import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenAppComponent } from './open-app.component';

describe('OpenAppComponent', () => {
  let component: OpenAppComponent;
  let fixture: ComponentFixture<OpenAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpenAppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpenAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
