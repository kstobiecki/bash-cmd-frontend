import { Component } from '@angular/core';
import { BashApiService } from '../../services';

@Component({
  selector: 'app-command-history',
  templateUrl: './command-history.component.html',
  styleUrls: ['./command-history.component.scss'],
})
export class CommandHistoryComponent {
  constructor(private bashApiSerice: BashApiService) {}
}
