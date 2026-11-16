import { test } from '@japa/runner'

test.group('Home page', () => {
  test('renders home page with inertia and default system preference', async ({ client }) => {
    const response = await client.get('/').withInertia()

    response.assertStatus(200)
    response.assertInertiaComponent('home')
    response.assertInertiaPropsContains({
      preferences: { theme: 'system' },
    })
  })

  test('respects dark theme cookie preference', async ({ client }) => {
    const response = await client.get('/').cookie('app_theme', 'dark').withInertia()

    response.assertStatus(200)
    response.assertInertiaComponent('home')
    response.assertInertiaPropsContains({
      preferences: { theme: 'dark' },
    })
  })

  test('respects light theme cookie preference', async ({ client }) => {
    const response = await client.get('/').cookie('app_theme', 'light').withInertia()

    response.assertStatus(200)
    response.assertInertiaComponent('home')
    response.assertInertiaPropsContains({
      preferences: { theme: 'light' },
    })
  })

  test('falls back to system when invalid theme cookie is sent', async ({ client }) => {
    const response = await client.get('/').cookie('app_theme', 'solarized').withInertia()

    response.assertStatus(200)
    response.assertInertiaComponent('home')
    response.assertInertiaPropsContains({
      preferences: { theme: 'system' },
    })
  })
})
