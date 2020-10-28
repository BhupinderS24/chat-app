import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TableComponent } from '../table/table.component';
import { ChatWindowComponent } from '../chat-window/chat-window.component';
import { InviteWindowComponent } from '../invite-window/invite-window.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'chats/:chatId', component: ChatWindowComponent },
      { path: 'invite/:userId', component: InviteWindowComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
