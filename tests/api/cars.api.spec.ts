import { test, expect } from '@playwright/test';

test.describe('Cars API Tests - POST /api/cars', () => {
  let sid: string;

  test.beforeAll(async ({ request }) => {
    const response = await request.post('/api/auth/signin', {
      data: {
        email: "qann21test@gmail.com",
        password: "plm123QA",
        remember: false
      }
    });
    
    expect(response.status()).toBe(200);
    const responseHeaders = response.headers();
    sid = responseHeaders['set-cookie'].split(';')[0];
  });

  test('should successfully create a car with valid data', async ({ request }) => {
    // Генеруємо випадковий пробіг від 1000 до 999999 за допомогою нативного JS
    const randomMileage = Math.floor(Math.random() * (999999 - 1000 + 1)) + 1000;

    const response = await request.post('/api/cars', {
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: randomMileage
      },
      headers: {
        Cookie: sid
      }
    });

    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody.status).toBe('ok');
    expect(responseBody.data.carBrandId).toBe(1);
    expect(responseBody.data.mileage).toBe(randomMileage);
  });

  test('should fail to create a car with non-existent brand id', async ({ request }) => {
    const response = await request.post('/api/cars', {
      data: {
        carBrandId: 9999,
        carModelId: 1,
        mileage: 5000
      },
      headers: {
        Cookie: sid
      }
    });

    expect(response.status()).toBe(404);
    const responseBody = await response.json();
    expect(responseBody.status).toBe('error');
  });

  test('should fail to create a car without authorization', async ({ request }) => {
    const response = await request.post('/api/cars', {
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: 3000
      }
    });

    expect(response.status()).toBe(401);
    const responseBody = await response.json();
    expect(responseBody.status).toBe('error');
    expect(responseBody.message).toBe('Not authenticated');
  });
});