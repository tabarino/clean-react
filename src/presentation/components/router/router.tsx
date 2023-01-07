import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '@/presentation/pages';
import { Validation } from '@/presentation/protocols/validation';
import { Authentication, AuthenticationParams } from '@/domain/usecases';
import { mockAccountModel } from '@/domain/mocks';
import { AccountModel } from '@/domain/models';

class ValidationSpy implements Validation {
  errorMessage!: string;
  fieldName !: string;
  fieldValue !: string;

  validate(fieldName: string, fieldValue: string): string {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    return this.errorMessage;
  }
}

class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  params!: AuthenticationParams;

  async auth(params: AuthenticationParams): Promise<AccountModel | undefined> {
    this.params = params;
    return Promise.resolve(this.account);
  }
}

const Router: React.FC = () => {
  const validation = new ValidationSpy();
  const authentication = new AuthenticationSpy();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login validation={validation} authentication={authentication} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
