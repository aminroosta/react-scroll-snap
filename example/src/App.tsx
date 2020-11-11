import React from 'react'

import { SnapY } from 'react-scroll-snap'
import 'react-scroll-snap/dist/index.css'

const page_stl = {
  width: '100%',
  height: '100%',
};

let keyframes = [
  { background: 'slateblue' },
  { background: 'teal' },
  { background: 'tomato' },
  { background: 'skyblue' },
];

const App = () => {
  return <SnapY keyframes={keyframes}>
    <div style={{ ...page_stl }} >page 1</div>
    <div style={{ ...page_stl }}>page 2</div>
    <div style={{ ...page_stl }}>page 3</div>
    <div style={{ ...page_stl }}>page 4</div>
  </SnapY>
}

export default App
