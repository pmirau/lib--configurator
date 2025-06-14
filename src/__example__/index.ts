import contextPath1 from './data/graph/context/path1.json'
import contextPath2 from './data/graph/context/path2.json'
import contextPath3 from './data/graph/context/path3.json'
import { path1, path2, path3 } from './data/graph/context/debug'
import nodes from './data/graph/nodes.json'

export { default as Graph } from './components/Graph'

export const data = {
  context: {
    path1: contextPath1,
    path2: contextPath2,
    path3: contextPath3,
  },
  contextDebug: {
    path1,
    path2,
    path3,
  },
  nodes,
}
