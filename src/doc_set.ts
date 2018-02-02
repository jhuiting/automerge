import { Map, Set } from 'immutable'
import * as uuid from 'uuid'
import FreezeAPI from './freeze_api'

export default class DocSet {
  private docs: Map<string, any>
  private handlers: Set<Function>

  constructor() {
    this.docs = Map()
    this.handlers = Set<Function>()
  }

  get docIds(): any {
    return this.docs.keys()
  }

  getDoc(docId) {
    return this.docs.get(docId)
  }

  setDoc(docId, doc) {
    this.docs = this.docs.set(docId, doc)
    this.handlers.forEach(handler => handler(docId, doc))
  }

  applyChanges(docId, changes) {
    let doc = this.docs.get(docId) || FreezeAPI.init(uuid.v4())
    doc = FreezeAPI.applyChanges(doc, changes, true)
    this.setDoc(docId, doc)
    return doc
  }

  registerHandler(handler) {
    this.handlers = this.handlers.add(handler)
  }

  unregisterHandler(handler) {
    this.handlers = this.handlers.remove(handler)
  }
}

