import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { AvatarFragmentComponent } from './components/avatar-fragment/avatar-fragment.component';
import { FormFragmentComponent } from './components/form-fragment/form-fragment.component';
import { DeleteAccountComponent } from './components/delete-account/delete-account.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    AccountComponent,
    AvatarFragmentComponent,
    FormFragmentComponent,
    DeleteAccountComponent,
  ],
  imports: [CommonModule, SharedModule, AccountRoutingModule],
})
export class AccountModule {}
