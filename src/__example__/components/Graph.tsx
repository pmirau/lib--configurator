import React, { useState } from 'react'
import NodeComponent from './Node'
import GraphFactory from '../../factories/GraphFactory'
import nodesData from '../data/graph/nodes.json'
import { ConditionalContext } from '../../types'
import { Node } from '../../'
import styles from './Graph.module.scss'

// @ts-ignore
const graphFactory = new GraphFactory(nodesData)
const graph = graphFactory.createGraph('g1')
console.log(graph.print(path2Context))

const GraphComponent = () => {
  const [context, setContext] = useState<ConditionalContext>({ values: {} })

  const toggleProperty = (property: string, value: string) => {
    if (context.values[property]) {
      setContext({
        values: {
          ...context.values,
          [property]: '',
        },
      })
    } else {
      setContext({
        values: {
          ...context.values,
          [property]: value,
        },
      })
    }
  }

  return (
    <div>
      <pre>
        {Object.entries(context.values)}
      </pre>
      <button type="button" onClick={() => toggleProperty('p2', 'n3')}>Set p2</button>
      <button type="button" onClick={() => toggleProperty('p5', 'n6')}>Set p5</button>
      <button type="button" onClick={() => toggleProperty('p7', 'n8')}>Set p7</button>
      <button type="button" onClick={() => toggleProperty('p8', 'n9')}>Set p8</button>
      {graph.start && <NodeLogic node={graph.start} context={context} />}
    </div>
  )
}

type NodeLogicProps = {
  node: Node;
  context: ConditionalContext;
}

const NodeLogic = ({ node, context }: NodeLogicProps) => {
  return (
    <div>
      <NodeComponent id={node.id} />
      {node.next(context) && (
        <NodeLogic node={node.next(context)} context={context} />
      )}
    </div>
  )
}

export default GraphComponent
