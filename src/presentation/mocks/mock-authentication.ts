import { mockAccountModel } from '@/domain/mocks';
import { AccountModel } from '@/domain/models';
import { Authentication, AuthenticationParams } from '@/domain/usecases';

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  params!: AuthenticationParams;
  callsCount = 0;

  async auth(params: AuthenticationParams): Promise<AccountModel | undefined> {
    this.params = params;
    this.callsCount++;
    return Promise.resolve(this.account);
  }
}
