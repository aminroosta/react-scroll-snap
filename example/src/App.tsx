import React from 'react'

import { SnapY, Page } from 'react-scroll-snap'
import 'react-scroll-snap/dist/index.css'

let frames = [
  [
    { offset: 0 / 3, background: 'slateblue' },
    { offset: 1 / 3, background: 'teal' },
  ],
  [
    { offset: 0 / 3, background: 'slateblue' },
    { offset: 1 / 3, background: 'teal' },
    { offset: 2 / 3, background: 'tomato' },
  ],
  [
    { offset: 1 / 3, background: 'teal' },
    { offset: 2 / 3, background: 'tomato' },
    { offset: 3 / 3, background: 'skyblue' },
  ],
  [
    { offset: 2 / 3, background: 'tomato' },
    { offset: 3 / 3, background: 'skyblue' },
  ]
];

const style = { paddingTop: '1em' };


const App = () => {
  return <SnapY>
    <Page style={style} frames={frames[0]}>page 1</Page>
    <Page style={style} frames={frames[1]}>page 2</Page>
    <Page style={style} frames={frames[2]}>page 3</Page>
    <Page style={style} frames={frames[3]}>page 4</Page>

    <Page skip_snap
      style={{
        position: "absolute",
        background: 'blue',
        height: '.5em',
        top: 0,
        left: 0,
      }}
      frames={[
        { offset: 0, transform: 'translateX(-75%)'},
        { offset: 1, transform: 'translateX(0)'}
      ]}
    />
  </SnapY>
}

export default App
