import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

import User from '#models/user'

test.group('Auth / Logout', (group) => {
  group.each.setup(() => testUtils.db().wrapInGlobalTransaction())

  test('redirects unauthenticated user to login', async ({ client }) => {
    const response = await client.post('/logout').withCsrfToken()

    response.assertRedirectsTo('/login')
  })

  test('logs out authenticated user and redirects to login page', async ({ client }) => {
    const user = await User.create({
      fullName: 'Active User',
      email: 'active@example.com',
      password: 'password123',
    })

    const response = await client.post('/logout').withCsrfToken().loginAs(user)

    response.assertRedirectsTo('/login')
  })
})
