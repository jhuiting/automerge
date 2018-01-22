import * as assert from 'assert'
import Automerge from '../src/automerge'
import { equalsOneOf } from './helpers'

describe('Automerge getChangesForActor API', () => {
  let oneDoc, twoDoc, mergeDoc

  beforeEach(() => {
    oneDoc = Automerge.change(Automerge.init('actor1'), doc => doc.document = 'watch me now')
    twoDoc = Automerge.init('actor2')
    twoDoc = Automerge.change(twoDoc, doc => doc.document = 'i can mash potato')
    twoDoc = Automerge.change(twoDoc, doc => doc.document = 'i can do the twist')
    mergeDoc = Automerge.merge(oneDoc, twoDoc)
  })

  it('should get changes for a single actor', () => {
    let actorChanges = Automerge.getChangesForActor(mergeDoc, 'actor2')

    assert.equal(actorChanges.length, 2)
    assert.equal(actorChanges[0].actor, 'actor2')
  })
})

