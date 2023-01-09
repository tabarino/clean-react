import { RemoteAuthentication } from '@/data/usecases';
import { Authentication } from '@/domain/usecases';
import { makeApiUrl } from '@/main/factories/http/api-url/api-url-factory';
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client/axios-http-client-factory';

export const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(makeApiUrl('login'), makeAxiosHttpClient());
};
