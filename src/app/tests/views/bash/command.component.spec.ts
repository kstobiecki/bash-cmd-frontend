import { TestBed } from '@angular/core/testing';
import { CommandComponent } from '../../../views/bash/components';
import { BashServices } from '../../../views/bash/services';
import { HttpClientModule } from '@angular/common/http';

describe('CommandHandlerComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [CommandComponent],
      providers: [...BashServices],
    }).compileComponents();
  });

  it('should create the command handler component', () => {
    const fixture = TestBed.createComponent(CommandComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
  it('should render proper command handler elements', () => {
    const fixture = TestBed.createComponent(CommandComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.command-handler-container label[for=command]')?.textContent).toContain(
      'Command: ',
    );
    expect(compiled.querySelector('.result-handler-container label[for=result]')?.textContent).toContain(
      'Result: ',
    );
  });
});
