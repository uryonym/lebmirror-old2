/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { baseKeymap } from 'prosemirror-commands'
import { dropCursor } from 'prosemirror-dropcursor'
import { gapCursor } from 'prosemirror-gapcursor'
import { history } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { Plugin } from 'prosemirror-state'
import pmKeymaps from './pmKeymaps'
import pmInputRules from './pmInputRules'
import schema from './pmSchema'

const pmPlugins = (): Plugin[] => [
  history(),
  keymap(pmKeymaps()),
  keymap(baseKeymap),
  pmInputRules(schema),
  dropCursor(),
  gapCursor(),
]

export default pmPlugins
