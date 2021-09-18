
import { getChildType, getType, types } from 'mobx-state-tree'

export function createControllers (...args) {
  return types.model('Controllers', {
    controllers: types.map(types.union(...args)),
  }).views(self => ({
    getController (name) {
      return self.controllers.get(name)
    },
  })).actions(self => ({
    addController (name, object) {
      // ugly hack: dynamically add new types to the union
      if (!getChildType(self.controllers)._types.includes(getType(object))) {
        getChildType(self.controllers)._types.push(getType(object))
      }
      self.controllers.set(name, object)
      return object
    },
    delController (name) {
      self.controllers.delete(name)
    },
  }))
}
