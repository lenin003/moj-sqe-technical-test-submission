import { test, expect } from '@playwright/test';
import { createPet, deletePet, getPet } from '../../utils/apiClient';

test.describe('Swagger Petstore - API test', () => {
  test('create/fetch pet with invalid-id negative check', async ({ request }) => {
    const petId = Date.now(); // simple unique id for the test run
    const payload = {
      id: petId,
      name: 'moj-sqe-pet',
      photoUrls: ['https://example.com/moj-sqe-pet.png'],
      category: { id: 1, name: 'test' },
      tags: [{ id: 1, name: 'automation' }],
      status: 'available' as const
    };

    await test.step('[POSITIVE] create and fetch a pet', async () => {
      const created = await createPet(request, payload);
      expect(created.id).toBe(petId);
      expect(created.name).toBe(payload.name);
      expect(created.photoUrls).toEqual(payload.photoUrls);

      const getRes = await getPet(request, petId);
      expect(getRes.status(), 'Expected GET to return 200').toBe(200);
      const got = await getRes.json();
      expect(got.id).toBe(petId);
      expect(got.name).toBe(payload.name);
      expect(got.photoUrls).toEqual(payload.photoUrls);
      expect(got.status).toBe(payload.status);

      // Cleanup (best effort)
      const delRes = await deletePet(request, petId);
      expect([200, 404]).toContain(delRes.status());
    });

    await test.step('[NEGATIVE] invalid pet id returns not found style response', async () => {
      const invalidId = -1;
      const notFoundRes = await getPet(request, invalidId);
      const status = notFoundRes.status();
      expect([400, 404]).toContain(status);

      const body = await notFoundRes.json();
      expect(typeof body).toBe('object');
      expect(body).toEqual(expect.objectContaining({ type: expect.any(String) }));

      if (status === 404) {
        expect(body).toEqual(expect.objectContaining({ message: 'Pet not found' }));
      }
    });
  });
});
