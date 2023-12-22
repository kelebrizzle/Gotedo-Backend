import test from 'japa';
import supertest from 'supertest';
import { createServer, destroyDb } from './helpers';

test.group('Support Request Tests', (group) => {
  group.beforeEach(async () => {
    // Create a new server and perform any setup before each test
    await createServer();
  });

  group.afterEach(async () => {
    // Destroy the server and perform any cleanup after each test
    await destroyDb();
  });

  test('it should submit a support request', async (assert) => {
    const response = await supertest(createServer()).post('/api/support-request').send({
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      title: 'Test Support Request',
      text: 'This is a test support request.',
    });

    // Assert the response status code
    assert.equal(response.status, 201);

    // Assert the response contains the expected message
    assert.equal(response.body.message, 'Support request submitted successfully');
  });

  test('it should fail to submit a support request with missing data', async (assert) => {
    const response = await supertest(createServer()).post('/api/support-request').send({
    });

    // Assert the response status code for validation error
    assert.equal(response.status, 422);

    // Assert the response contains the validation error messages
    assert.deepEqual(response.body.errors, [
      { field: 'first_name', rule: 'required', message: 'required validation failed on first_name' },
      // Add more validation errors based on your rules
    ]);
  });

  test('it should upload a file with a support request', async (assert) => {
    const response = await supertest(createServer())
      .post('/api/support-request')
      .field('first_name', 'John')
      .field('last_name', 'Doe')
      .field('email', 'john.doe@example.com')
      .field('title', 'Test Support Request')
      .field('text', 'This is a test support request.')
      .attach('file', 'path/to/test-file.txt');

    // Assert the response status code
    assert.equal(response.status, 201);

    // Assert the response contains the expected message
    assert.equal(response.body.message, 'Support request submitted successfully');
  });
});
