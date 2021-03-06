import test from 'tape'
import distinct from '../../../signals/processes/distinct'
import { spy } from 'sinon'

test('distinct', (assert) => {
  const signal = spy()
  const next = spy()
  distinct()(signal)(next)

  const handler = signal.getCall(0).args[0]

  handler(1)
  handler(1)
  handler(2)
  handler(2)
  handler(2)
  handler(3)
  assert.equal(next.getCall(0).args[0], 1)
  assert.equal(next.getCall(1).args[0], 2)
  assert.equal(next.getCall(2).args[0], 3)
  assert.ok(!next.getCall(3))

  assert.end()
})
