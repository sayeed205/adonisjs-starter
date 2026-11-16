import app from '@adonisjs/core/services/app'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

import User from '#models/user'
import UserTransformer from '#transformers/user_transformer'

interface SerializedUserPayload {
  id?: number
  fullName?: string | null
  email?: string
  initials?: string
  password?: string
}

test.group('UserTransformer', (group) => {
  group.each.setup(() => testUtils.db().wrapInGlobalTransaction())

  test('transforms user model and hides sensitive attributes', async ({ assert }) => {
    const user = await User.create({
      fullName: 'Grace Hopper',
      email: 'grace@example.com',
      password: 'super-secret-password',
    })

    const transformer = new UserTransformer(user)
    const transformed = transformer.toObject()

    assert.equal(transformed.id, user.id)
    assert.equal(transformed.fullName, 'Grace Hopper')
    assert.equal(transformed.email, 'grace@example.com')
    assert.equal(transformed.initials, 'GH')
    assert.isNotNull(transformed.createdAt)

    // SAFETY: Verifying password property was not copied to the transformed object.
    const untyped = transformed as SerializedUserPayload

    assert.isUndefined(untyped.password)
  })

  test('resolves transformer item via container', async ({ assert }) => {
    const user = await User.create({
      fullName: 'Ada Lovelace',
      email: 'ada@example.com',
      password: 'another-secret-password',
    })

    const item = UserTransformer.transform(user)
    const resolved = await item.resolve(app.container.createResolver(), 1)

    // SAFETY: Transformed output type assertion for test assertions.
    const untyped = resolved as SerializedUserPayload

    assert.equal(untyped.id, user.id)
    assert.equal(untyped.fullName, 'Ada Lovelace')
    assert.equal(untyped.email, 'ada@example.com')
    assert.equal(untyped.initials, 'AL')
    assert.isUndefined(untyped.password)
  })
})
