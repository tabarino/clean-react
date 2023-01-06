import axios from 'axios';
import { faker } from '@faker-js/faker';

export const mockAxiosResult = {
  data: faker.science.unit(),
  status: faker.random.numeric(),
};

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.post.mockResolvedValue(mockAxiosResult);
  return mockedAxios;
};
