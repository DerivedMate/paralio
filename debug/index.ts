import { Paralio } from '../dist' 
import { resolve } from 'path'

export interface Context {
  name: string
}

async function main() {
  const app = new Paralio({
    max: 4,
    workerPath: resolve(__dirname, './worker'),
    input: resolve(__dirname, './input.json'),
    context: {
      name: 'Bob',
    },
    onInputLoaded: JSON.parse,
    repl: false,
  })

  app.on('data', ([data, app]) => {
    app.context
  })

  app.on('end', self => {
    self.output = self.output.filter(x => !!x).sort()
  })
}

main()
