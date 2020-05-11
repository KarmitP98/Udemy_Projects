import { Injectable } from "@angular/core";

@Injectable({
              providedIn : "root"
            })
export class LoggingService {

  lastLog: string;

  constructor() { }

  log(message: string) {
    console.log("Current Log: " + message);
    console.log("Last Log: " + this.lastLog);
    this.lastLog = message;
  }
}
