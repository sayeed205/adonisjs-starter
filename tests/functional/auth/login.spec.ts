import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

import User from '#models/user'

test.group('Auth / Login', (group) => {
  group.each.setup(() => testUtils.db().wrapInGlobalTransaction())

  test('renders login page for guest users', async ({ client }) => {
    const response = await client.get('/login').withInertia()

    response.assertStatus(200)
    response.assertInertiaComponent('auth/login')
  })

  test('redirects authenticated user away from login page', async ({ client }) => {
    const user = await User.create({
      fullName: 'Logged-in User',
      email: 'logged@example.com',
      password: 'password123',
    })

    const response = await client.get('/login').loginAs(user)

    response.assertRedirectsTo('/')
  })

  test('fails validation when email and password are not provided', async ({ client }) => {
    const response = await client.post('/login').withInertia().withCsrfToken().header('referer', '/login').json({})

    response.assertStatus(200)
    response.assertInertiaComponent('auth/login')
    response.assertInertiaPropsContains({
      errors: {
        email: 'The email field must be defined',
        password: 'The password field must be defined',
      },
    })
  })

  test('fails authentication when credentials do not match', async ({ client, assert }) => {
    await User.create({
      fullName: 'Real User',
      email: 'real@example.com',
      password: 'correct-password',
    })

    const response = await client.post('/login').withInertia().withCsrfToken().header('referer', '/login').json({
      email: 'real@example.com',
      password: 'wrong-password',
    })

    response.assertStatus(200)
    response.assertInertiaComponent('auth/login')

    // SAFETY: Asserting flash payload structure in Inertia page body.
    const body = response.body() as { flash?: { error?: string } }

    assert.equal(body.flash?.error, 'Invalid user credentials')
  })

  test('successfully authenticates with valid credentials and redirects to dashboard', async ({ client }) => {
    await User.create({
      fullName: 'Target User',
      email: 'target@example.com',
      password: 'valid-password-123',
    })

    const response = await client.post('/login').withInertia().withCsrfToken().json({
      email: 'target@example.com',
      password: 'valid-password-123',
    })

    response.assertRedirectsTo('/dashboard')
  })
})
