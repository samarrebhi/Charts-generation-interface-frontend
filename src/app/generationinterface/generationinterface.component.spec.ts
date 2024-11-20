import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationinterfaceComponent } from './generationinterface.component';

describe('GenerationinterfaceComponent', () => {
  let component: GenerationinterfaceComponent;
  let fixture: ComponentFixture<GenerationinterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerationinterfaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerationinterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
