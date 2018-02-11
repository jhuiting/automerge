import { Set, fromJS } from 'immutable'
import * as  uuid from 'uuid'

import FreezeAPI from './freeze_api'

export default class WatchableDoc {
  handlers: Set<Function>
  doc: any

  constructor (doc) {
    this.doc = doc
    this.handlers = Set<Function>()
  }

  get () {
    return this.doc
  }

  set (doc) {
    this.doc = doc
    this.handlers.forEach(handler => handler(doc))
  }

  applyChanges (changes) {
    let doc = this.doc || FreezeAPI.init(uuid.v4())
    doc = FreezeAPI.applyChanges(doc, fromJS(changes), true)
    this.set(doc)
    return doc
  }

  registerHandler (handler) {
    this.handlers = this.handlers.add(handler)
  }

  unregisterHandler (handler) {
    this.handlers = this.handlers.remove(handler)
  }
}