import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommandComponent } from '../../../views/bash/components';
import { BashApiService, BashServices } from '../../../views/bash/services';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { BashResultInterface } from '../../../views/bash/interfaces';
import { ErrorEnum } from '../../../common/enums';

describe('CommandHandlerComponent', () => {
  let component: CommandComponent;
  let fixture: ComponentFixture<CommandComponent>;
  let httpClientSpy: { post: jasmine.Spy };
  let bashApiService: BashApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [CommandComponent],
      providers: [...BashServices],
    }).compileComponents();

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    bashApiService = new BashApiService(httpClientSpy as any);
    fixture = TestBed.createComponent(CommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the command handler component', () => {
    expect(component).toBeTruthy();
  });

  it('should render proper command handler elements', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('.command-handler-container label[for=command]')
        ?.textContent,
    ).toContain('Command: ');
    expect(compiled.querySelector('#command')).toBeTruthy();
    expect(
      compiled.querySelector('.result-handler-container label[for=result]')
        ?.textContent,
    ).toContain('Result: ');
    expect(compiled.querySelector('#result')).toBeTruthy();
    expect(
      compiled.querySelector('.command-handler-form button span')?.textContent,
    ).toContain('Submit');
  });

  it('should bashCommandForm be invalid on init and valid after writing a character in input', () => {
    const form = component.bashCommandForm;
    expect(form.valid).toBeFalsy();

    const commandInput = form.controls.command;
    commandInput.setValue('uname -a');
    expect(form.valid).toBeTruthy();
  });

  it(`should bashCommandForm be invalid on input 'dirty', 'touched' and empty`, () => {
    const form = component.bashCommandForm;
    const commandInput = form.controls.command;
    commandInput.setValue('uname -a');
    expect(form.valid).toBeTruthy();
    commandInput.setValue('');
    expect(form.valid).toBeFalsy();
    expect(commandInput?.errors?.required).toBeTruthy();
  });

  it(`should test on submit with successfully run command`, (done: DoneFn) => {
    component.onSubmit();
    httpClientSpy.post.and.returnValue(of(mockedBashResult));

    bashApiService
      .runCommand('echo test')
      .subscribe((result: BashResultInterface) => {
        expect(result).toEqual(mockedBashResult);
        done();
      }, done.fail);
    expect(httpClientSpy.post.calls.count()).toBe(1);
  });

  it(`should test on submit with error from server`, async (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: ErrorEnum.COMMAND_NOT_FOUND,
      status: 400,
    });

    component.onSubmit();
    httpClientSpy.post.and.returnValue(throwError(errorResponse));

    bashApiService.runCommand('echo test').subscribe(
      (result: BashResultInterface) =>
        done.fail(`expected an error, not result: ${result}`),
      ({ error }: HttpErrorResponse) => {
        expect(error).toContain(ErrorEnum.COMMAND_NOT_FOUND);
        done();
      },
    );
    expect(httpClientSpy.post.calls.count()).toBe(1);
  });
});

const mockedBashResult: BashResultInterface = {
  _id: 'someId',
  cmd: 'someCmd',
  result: 'someResult',
  createdAt: new Date(),
  __v: 0,
};
