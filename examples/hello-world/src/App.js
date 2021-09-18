import { plugin, typePlugin } from '@hoc/plugins-core'
import { hocApp } from '@hoc/app'
import { Label } from '@hoc/widgets'

const App = plugin('App', {
  snapshot: typePlugin(Label, () => Label.create({ text: 'Hello world' })),
})

export default hocApp(App.create())
