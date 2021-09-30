import { Component } from '@angular/core';
import { BashApiService } from '../../services';

@Component({
  selector: 'app-command-handler',
  templateUrl: './command-handler.component.html',
  styleUrls: ['./command-handler.component.scss'],
})
export class CommandHandlerComponent {
  constructor(private bashApiSerice: BashApiService) {}
}
