import React from 'react'
import styles from './Node.module.scss'

type NodeProps = {
  id: string;
}

const Node = ({ id }: NodeProps) => {
  return (
    <div>
      {id}
    </div>
  )
}

export default Node
