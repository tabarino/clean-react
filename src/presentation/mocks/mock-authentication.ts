import { mockAccountModel } from '@/domain/mocks';
import { AccountModel } from '@/domain/models';
import { Authentication, AuthenticationParams } from '@/domain/usecases';

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  params!: AuthenticationParams;

  async auth(params: AuthenticationParams): Promise<AccountModel | undefined> {
    this.params = params;
    return Promise.resolve(this.account);
  }
}
