import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

import User from '#models/user'
import { loginValidator, signupValidator } from '#validators/user'

test.group('User validators', (group) => {
  group.each.setup(() => testUtils.db().wrapInGlobalTransaction())

  test('signupValidator passes with valid data', async ({ assert }) => {
    const payload = {
      fullName: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password123',
      passwordConfirmation: 'password123',
    }

    const output = await signupValidator.validate(payload)

    assert.equal(output.email, 'jane@example.com')
    assert.equal(output.fullName, 'Jane Doe')
  })

  test('signupValidator accepts null fullName', async ({ assert }) => {
    const payload = {
      fullName: null,
      email: 'no-name@example.com',
      password: 'password123',
      passwordConfirmation: 'password123',
    }

    const output = await signupValidator.validate(payload)

    assert.isNull(output.fullName)
    assert.equal(output.email, 'no-name@example.com')
  })

  test('signupValidator fails when email is invalid', async ({ assert }) => {
    const payload = {
      fullName: 'Bad Email',
      email: 'not-an-email',
      password: 'password123',
      passwordConfirmation: 'password123',
    }

    await assert.rejects(async () => {
      await signupValidator.validate(payload)
    })
  })

  test('signupValidator fails when password is shorter than 8 characters', async ({ assert }) => {
    const payload = {
      fullName: 'Short Pass',
      email: 'short@example.com',
      password: 'pass',
      passwordConfirmation: 'pass',
    }

    await assert.rejects(async () => {
      await signupValidator.validate(payload)
    })
  })

  test('signupValidator fails when passwordConfirmation does not match', async ({ assert }) => {
    const payload = {
      fullName: 'Mismatch',
      email: 'mismatch@example.com',
      password: 'password123',
      passwordConfirmation: 'different123',
    }

    await assert.rejects(async () => {
      await signupValidator.validate(payload)
    })
  })

  test('signupValidator fails when email is already registered', async ({ assert }) => {
    await User.create({
      fullName: 'Existing User',
      email: 'existing@example.com',
      password: 'password123',
    })

    const payload = {
      fullName: 'Duplicate',
      email: 'existing@example.com',
      password: 'password123',
      passwordConfirmation: 'password123',
    }

    await assert.rejects(async () => {
      await signupValidator.validate(payload)
    })
  })

  test('loginValidator passes with valid email and password', async ({ assert }) => {
    const payload = {
      email: 'login@example.com',
      password: 'any-password',
    }

    const output = await loginValidator.validate(payload)

    assert.equal(output.email, 'login@example.com')
    assert.equal(output.password, 'any-password')
  })

  test('loginValidator fails when email is missing or malformed', async ({ assert }) => {
    await assert.rejects(async () => {
      await loginValidator.validate({ password: 'secret-password' })
    })

    await assert.rejects(async () => {
      await loginValidator.validate({ email: 'invalid-email', password: 'secret-password' })
    })
  })

  test('loginValidator fails when password is missing', async ({ assert }) => {
    await assert.rejects(async () => {
      await loginValidator.validate({ email: 'user@example.com' })
    })
  })
})
