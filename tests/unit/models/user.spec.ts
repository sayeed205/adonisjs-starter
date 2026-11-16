import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

import User from '#models/user'

test.group('User model', (group) => {
  group.each.setup(() => testUtils.db().wrapInGlobalTransaction())

  test('computes initials correctly when fullName is provided with first and last name', ({ assert }) => {
    const user = new User()
    user.fullName = 'John Doe'
    user.email = 'john.doe@example.com'

    assert.equal(user.initials, 'JD')
  })

  test('computes initials correctly when fullName is a single name', ({ assert }) => {
    const user = new User()
    user.fullName = 'Cher'
    user.email = 'cher@example.com'

    assert.equal(user.initials, 'CH')
  })

  test('computes initials from email when fullName is null', ({ assert }) => {
    const user = new User()
    user.fullName = null
    user.email = 'john.doe@example.com'

    assert.equal(user.initials, 'JE')
  })

  test('computes initials from simple email when fullName is not set', ({ assert }) => {
    const user = new User()
    user.email = 'alex@example.com'

    assert.equal(user.initials, 'AE')
  })

  test('hashes password on user creation and verifies credentials correctly', async ({ assert }) => {
    const user = await User.create({
      fullName: 'Alice Smith',
      email: 'alice@example.com',
      password: 'super-secure-password',
    })

    assert.isNotNull(user.id)
    assert.notEqual(user.password, 'super-secure-password')

    const verifiedUser = await User.verifyCredentials('alice@example.com', 'super-secure-password')
    assert.equal(verifiedUser.id, user.id)
  })

  test('verifyCredentials rejects invalid password', async ({ assert }) => {
    await User.create({
      fullName: 'Bob Jones',
      email: 'bob@example.com',
      password: 'correct-password',
    })

    await assert.rejects(async () => {
      await User.verifyCredentials('bob@example.com', 'wrong-password')
    })
  })

  test('verifyCredentials rejects non-existent email', async ({ assert }) => {
    await assert.rejects(async () => {
      await User.verifyCredentials('nonexistent@example.com', 'password123')
    })
  })
})
