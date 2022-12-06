import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './users/user/user.component';
import { ServersComponent } from './servers/servers.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolver } from './servers/server/server-resolver.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'users',
    component: UsersComponent,
    children: [{ path: ':id/:name', component: UserComponent }] //:id is a parameter that loads values dynamically
  },
  {
    path: 'servers',
    // canActivate: [AuthGuard], //the whole route is guarded
    canActivateChild: [AuthGuard], //child routes are guarded
    component: ServersComponent,
    children: [
      {
        path: ':id',
        component: ServerComponent,
        resolve: { server: ServerResolver }
      },
      {
        path: ':id/edit',
        component: EditServerComponent,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  },
  // { path: 'not-found', component: PageNotFoundComponent },
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: { message: 'Page not found!' } //message being sent along with router. If page is used in multiple pages, we can set multiple messgaes
  },
  { path: '**', redirectTo: '/not-found' }
  // { path: '', redirectTo: '/somewhere-else', pathMatch: 'full' }
  // should always be at the end, as paths are parsed top to bottom
];

@NgModule({
  // imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  // for old browsers support which not support the other way, usehash will append an # to the <url:port>,
  // Web server will maintain the url part, Angular will maintain the right part after #
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
