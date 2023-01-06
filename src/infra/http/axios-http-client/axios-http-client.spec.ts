import axios from 'axios';
import { faker } from '@faker-js/faker';
import { HttpPostParams } from '@/data/protocols/http';
import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

type SutTypes = {
  sut: AxiosHttpClient;
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  return { sut };
};

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.science.unit(),
});

describe('AxiosHttpClient', () => {
  test('Should call axios with correct URL and Verb', () => {
    const request = mockPostRequest();
    const { sut } = makeSut();
    sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url);
  });
});
