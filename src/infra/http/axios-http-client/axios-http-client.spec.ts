import axios from 'axios';
import { mockPostRequest } from '@/data/mocks';
import { mockAxios, mockAxiosResult } from '@/infra/mocks';
import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();
  return { sut, mockedAxios };
};

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', () => {
    const request = mockPostRequest();
    const { sut, mockedAxios } = makeSut();
    sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test('Should return the correct StatusCode and body', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.post(mockPostRequest());
    expect(httpResponse).toEqual({
      statusCode: mockAxiosResult.status,
      body: mockAxiosResult.data,
    });
  });
});
