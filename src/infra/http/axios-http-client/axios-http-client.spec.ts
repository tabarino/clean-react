import axios from 'axios';
import { faker } from '@faker-js/faker';
import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

type SutTypes = {
  sut: AxiosHttpClient;
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  return { sut };
}

describe('AxiosHttpClient', () => {
  test('Should call axios with correct URL and Verb', () => {
    const url = faker.internet.url();
    const { sut } = makeSut();
    sut.post({ url });
    expect(mockedAxios.post).toHaveBeenCalledWith(url);
  });
});
