import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

import User from '#models/user'

test.group('Dashboard page', (group) => {
  group.each.setup(() => testUtils.db().wrapInGlobalTransaction())

  test('redirects unauthenticated user to login', async ({ client }) => {
    const response = await client.get('/dashboard')

    response.assertRedirectsTo('/login')
  })

  test('renders dashboard for authenticated user with transformed user shared props', async ({ client }) => {
    const user = await User.create({
      fullName: 'Dashboard User',
      email: 'dash@example.com',
      password: 'password123',
    })

    const response = await client.get('/dashboard').loginAs(user).withInertia()

    response.assertStatus(200)
    response.assertInertiaComponent('dashboard')
    response.assertInertiaPropsContains({
      user: {
        id: user.id,
        fullName: 'Dashboard User',
        email: 'dash@example.com',
        initials: 'DU',
      },
    })
  })
})
