import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LoggingService} from '../logging.service';
import {AccountsService} from '../accounts.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // providers: [LoggingService] // Provide the instance of loggingservice class
})
export class AccountComponent {
  @Input() account: { name: string, status: string };
  @Input() id: number;

  // Custom constructor to create an instance of the logging service class
  // every time this component is called or checked.
  constructor(private loggingService: LoggingService,
              private accountsService: AccountsService) {
  }

  onSetTo(status: string) {
    this.accountsService.updateStatus(this.id, status);
    // this.loggingService.logStatusChange(status);  // Simple access to the instance of that class
  }
}
