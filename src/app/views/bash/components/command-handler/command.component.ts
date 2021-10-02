import { Component, OnDestroy, OnInit } from '@angular/core';
import { BashApiService } from '../../services';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { BashResultInterface } from '../../interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorEnum, ErrorMessageEnum } from '../../../../common/enums';
@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss'],
})
export class CommandComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public badCommand = '';
  public loading = false;
  public bashCommandForm = new FormGroup({
    command: new FormControl('', Validators.required),
    result: new FormControl(''),
  });

  constructor(private bashApiSerice: BashApiService) {}

  ngOnInit(): void {
    const commandSubscription = this.command?.valueChanges.subscribe(
      () => (this.badCommand = ''),
    );
    this.subscription.add(commandSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get command(): AbstractControl | null {
    return this.bashCommandForm.get('command');
  }

  onSubmit(): void {
    this.loading = true;
    const command = this.bashCommandForm.get('command')?.value;
    const commandSubscription = this.bashApiSerice
      .runCommand(command)
      .subscribe(
        (response: BashResultInterface) => {
          this.loading = false;
          this.bashCommandForm.patchValue({ result: response.result });
        },
        ({ error }: HttpErrorResponse) => {
          this.loading = false;
          if (error.error === ErrorEnum.COMMAND_NOT_FOUND) {
            this.badCommand = ErrorMessageEnum.COMMAND_NOT_FOUND;
          } else {
            this.badCommand = ErrorMessageEnum.SERVER_ERROR;
          }
        },
      );
    this.subscription.add(commandSubscription);
  }
}
