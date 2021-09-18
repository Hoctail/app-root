import React, { Component } from 'react'
import { observer } from 'mobx-react'
import {
  metaElement,
  Colors,
  setRootNode,
} from '@hoc/plugins-core'
import {
  Location,
  LoadPortalSpinnerStacked,
  InputDialog,
  TooltipMessage,
  createTooltipError,
} from '@hoc/plugins'
import { createControllers } from './controllers'

/**
 * @param AppComponent 
 * @param createRootCb - no callback args
*/
export function hocApp (appNode, createRootCb) {
  return observer(
    class AppClass extends Component {
      constructor (props) {
        super(props)
        if (typeof createRootCb === 'function') {
          this.app = createRootCb()
        }
        else {
          this.app = setRootNode(types.compose('App', createControllers()), {})
        }
      }

      async componentDidMount () {
        const app = this.app

        // create generic controls
        app.addController('AppColors', Colors.create({ id: 'AppColors' }))
        app.addController('LoadPortalSpinnerStacked',
          LoadPortalSpinnerStacked.create(),
        )          
        app.addController('Location', Location.create())
        app.addController('InputDialog', InputDialog.create())
        app.addController('TooltipMessage', TooltipMessage.create({
          relativePos: 'left',
        }))
        app.addController('TooltipError', createTooltipError())
        app.addController('App', appNode)
      }

      render () {
        // catch exception for case when obvious error in render, like typo
        try {
          let app, inputDialog, message,
            errorMessage, spinner, location
          if (!this.app.working) {
            inputDialog = this.app.getController('InputDialog')
            message = this.app.getController('TooltipMessage')
            errorMessage = this.app.getController('TooltipError')
            spinner = this.app.getController('LoadPortalSpinnerStacked')
            location = this.app.getController('Location')
            app = this.app.getController('App')
          }
          return (
            <React.StrictMode>
              {metaElement(inputDialog)}
              {metaElement(message)}
              {metaElement(errorMessage)}
              {metaElement(spinner)}
              {metaElement(location)}
              {metaElement(app)}
            </React.StrictMode>
          )
        } catch (e) {
          console.log(e)
          throw e
        }
      }
    },
  )
}
