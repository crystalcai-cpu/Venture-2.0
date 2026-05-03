// Lightweight shim replacing framer-motion when the package is unavailable.
// Renders plain HTML elements; animations degrade gracefully to no-ops.
import React from 'react'

type MotionProps = React.HTMLAttributes<HTMLElement> & {
  initial?: object
  animate?: object
  exit?: object
  transition?: object
  whileHover?: object
  whileInView?: object
  viewport?: object
  layout?: boolean
  layoutId?: string
  [key: string]: unknown
}

function stripMotionProps(props: MotionProps) {
  const { initial, animate, exit, transition, whileHover, whileInView, viewport, layout, layoutId, ...rest } = props
  void initial; void animate; void exit; void transition
  void whileHover; void whileInView; void viewport; void layout; void layoutId
  return rest
}

const makeMotionComponent = (tag: string) =>
  React.forwardRef<HTMLElement, MotionProps>((props, ref) => {
    const clean = stripMotionProps(props)
    return React.createElement(tag, { ...clean, ref })
  })

export const motion = {
  div: makeMotionComponent('div'),
  span: makeMotionComponent('span'),
  p: makeMotionComponent('p'),
  h1: makeMotionComponent('h1'),
  h2: makeMotionComponent('h2'),
  h3: makeMotionComponent('h3'),
  ul: makeMotionComponent('ul'),
  li: makeMotionComponent('li'),
  button: makeMotionComponent('button'),
  a: makeMotionComponent('a'),
  section: makeMotionComponent('section'),
  nav: makeMotionComponent('nav'),
  header: makeMotionComponent('header'),
  footer: makeMotionComponent('footer'),
  img: makeMotionComponent('img'),
}

export const AnimatePresence: React.FC<{ children?: React.ReactNode; mode?: string }> = ({ children }) =>
  React.createElement(React.Fragment, null, children)
