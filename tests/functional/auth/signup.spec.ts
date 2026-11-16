import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

import User from '#models/user'

test.group('Auth / Signup', (group) => {
  group.each.setup(() => testUtils.db().wrapInGlobalTransaction())

  test('renders signup page for guest users', async ({ client }) => {
    const response = await client.get('/signup').withInertia()

    response.assertStatus(200)
    response.assertInertiaComponent('auth/signup')
  })

  test('redirects authenticated user away from signup page', async ({ client }) => {
    const user = await User.create({
      fullName: 'Authenticated User',
      email: 'auth@example.com',
      password: 'password123',
    })

    const response = await client.get('/signup').loginAs(user)

    response.assertRedirectsTo('/')
  })

  test('fails validation when required fields are missing', async ({ client, db }) => {
    const response = await client.post('/signup').withInertia().withCsrfToken().header('referer', '/signup').json({})

    response.assertStatus(200)
    response.assertInertiaComponent('auth/signup')
    response.assertInertiaPropsContains({
      errors: {
        email: 'The email field must be defined',
        password: 'The password field must be defined',
        passwordConfirmation: 'The passwordConfirmation field must be defined',
      },
    })

    await db.assertEmpty('users')
  })

  test('fails validation when passwords do not match', async ({ client, db }) => {
    const response = await client.post('/signup').withInertia().withCsrfToken().header('referer', '/signup').json({
      fullName: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      passwordConfirmation: 'different-password',
    })

    response.assertStatus(200)
    response.assertInertiaComponent('auth/signup')
    response.assertInertiaPropsContains({
      errors: {
        passwordConfirmation: 'The passwordConfirmation field and password field must be the same',
      },
    })

    await db.assertMissing('users', { email: 'test@example.com' })
  })

  test('fails validation when email is already in use', async ({ client }) => {
    await User.create({
      fullName: 'Existing User',
      email: 'duplicate@example.com',
      password: 'password123',
    })

    const response = await client.post('/signup').withInertia().withCsrfToken().header('referer', '/signup').json({
      fullName: 'New User',
      email: 'duplicate@example.com',
      password: 'password123',
      passwordConfirmation: 'password123',
    })

    response.assertStatus(200)
    response.assertInertiaComponent('auth/signup')
    response.assertInertiaPropsContains({
      errors: {
        email: 'The email has already been taken',
      },
    })
  })

  test('successfully registers new user, authenticates session, and redirects to dashboard', async ({ client, db }) => {
    const response = await client.post('/signup').withInertia().withCsrfToken().json({
      fullName: 'Grace Hopper',
      email: 'grace@example.com',
      password: 'secure-password-123',
      passwordConfirmation: 'secure-password-123',
    })

    response.assertRedirectsTo('/dashboard')

    await db.assertHas('users', {
      email: 'grace@example.com',
      full_name: 'Grace Hopper',
    })
  })
})
