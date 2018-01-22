import { Map, Set, fromJS } from 'immutable'
import * as  uuid from 'uuid/v4';

import FreezeAPI from './freeze_api'

export default class WatchableDoc {
  public handlers;
  public doc

  constructor (doc) {
    this.doc = doc;
    this.handlers = Set<Function>();
  }

  get () {
    return this.doc
  }

  set (doc) {
    this.doc = doc
    this.handlers.forEach(handler => handler(doc))
  }

  applyChanges (changes) {
    let doc = this.doc || FreezeAPI.init(uuid())
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