import { Component } from '@angular/core';

@Component( {
              selector: 'app-root',
              templateUrl: './app.component.html',
              styleUrls: [ './app.component.css' ]
            } )
export class AppComponent {
  servers = [
    {
      instanceType: 'medium',
      name: 'Production',
      status: 'stable',
      started: new Date( 2017, 1, 1 )
    },
    {
      instanceType: 'large',
      name: 'User Database',
      status: 'stable',
      started: new Date( 2017, 1, 1 )
    },
    {
      instanceType: 'small',
      name: 'Development Server',
      status: 'offline',
      started: new Date( 2017, 1, 1 )
    },
    {
      instanceType: 'small',
      name: 'Testing Environment Server',
      status: 'stable',
      started: new Date( 2017, 1, 1 )
    }
  ];
  filteredStatus: "";

  appStatus = new Promise(((resolve, reject) => {
    setTimeout(() => {
      resolve("stable");
    }, 1000)
  }))

  getStatusClasses( server: { instanceType: string, name: string, status: string, started: Date } ) {
    return {
      'list-group-item-success': server.status === 'stable',
      'list-group-item-warning': server.status === 'offline',
      'list-group-item-danger': server.status === 'critical'
    };
  }

  onAddServer(): void {
    this.servers.push( {
                         instanceType: "small",
                         name: "New Server",
                         status: "stable",
                         started: new Date( 2017, 1, 1 )
                       } );



  }
}
