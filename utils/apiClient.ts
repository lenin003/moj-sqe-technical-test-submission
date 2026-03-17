import { APIRequestContext, expect } from '@playwright/test';
import { env } from './env';

export type Pet = {
  id: number;
  name: string;
  photoUrls: string[];
  category?: {
    id: number;
    name: string;
  };
  tags?: Array<{
    id: number;
    name: string;
  }>;
  status?: 'available' | 'pending' | 'sold';
};

export async function createPet(request: APIRequestContext, pet: Pet) {
  const res = await request.post(`${env.apiBaseUrl}/pet`, {
    data: pet,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  expect(res.ok(), `Expected create pet to succeed, got ${res.status()}`).toBeTruthy();
  return res.json() as Promise<Pet>;
}

export async function getPet(request: APIRequestContext, petId: number) {
  return request.get(`${env.apiBaseUrl}/pet/${petId}`);
}

export async function deletePet(request: APIRequestContext, petId: number) {
  return request.delete(`${env.apiBaseUrl}/pet/${petId}`);
}
