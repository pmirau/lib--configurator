import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Node from '../../graph/Node';
import NodeComponent from './Node';
import GraphFactory from '../../factories/GraphFactory';
import nodesData from '../data/nodes.json';
import path2Context from '../data/context/path2.json';
import styles from './Graph.module.scss';

const graphFactory = new GraphFactory(nodesData);
const graph = graphFactory.createGraph();
console.log(graph.print(path2Context));

const GraphComponent = () => {
  const [context, setContext] = useState({ values: {} });

  const toggleProperty = (property, value) => {
    if (context.values[property]) {
      setContext({
        values: {
          ...context.values,
          [property]: '',
        },
      });
    } else {
      setContext({
        values: {
          ...context.values,
          [property]: value,
        },
      });
    }
  };

  return (
    <div>
      <pre>
        {Object.entries(context.values)}
      </pre>
      <button type="button" onClick={() => toggleProperty('p2', 'n3')}>Set p2</button>
      <button type="button" onClick={() => toggleProperty('p5', 'n6')}>Set p5</button>
      <button type="button" onClick={() => toggleProperty('p7', 'n8')}>Set p7</button>
      <button type="button" onClick={() => toggleProperty('p8', 'n9')}>Set p8</button>
      <NodeLogic node={graph.start} context={context} />
    </div>
  );
};

GraphComponent.propTypes = {};

const NodeLogic = ({ node, context }) => {
  return (
    <div>
      <NodeComponent id={node.id} />
      {node.next(context) && (
        <NodeLogic node={node.next(context)} context={context} />
      )}
    </div>
  );
};

NodeLogic.propTypes = {
  node: PropTypes.instanceOf(Node),
};

export default GraphComponent;
