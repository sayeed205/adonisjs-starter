import { test } from '@japa/runner'

test.group('Error handling', () => {
  test('returns 404 when visiting non-existent route', async ({ client }) => {
    const response = await client.get('/non-existent-route')

    response.assertStatus(404)
  })
})
