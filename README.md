# scroll-snap-react

> scroll snap + react

## Install

```bash
npm install --save scroll-snap-react
```

## Usage

frames will be interpolated using web animation api.

```tsx
import React, { CSSProperties } from 'react'

import { Snap, Page } from 'react-scroll-snap'
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

type Example = React.FC<{ dir: 'x' | 'y', style: CSSProperties }>;
const Example: Example = ({ dir, style }) => {
  const page_style = { padding: '2em' };
  return <Snap
    dir={dir}
    style={style}
  >
    <Page style={page_style} frames={frames[0]}>1- scroll in {dir} direction</Page>
    <Page style={page_style} frames={frames[1]}>2- scroll in {dir} direction</Page>
    <Page style={page_style} frames={frames[2]}>3- scroll in {dir} direction</Page>
    <Page style={page_style} frames={frames[3]}>4- scroll in {dir} direction</Page>

    <Page skip_snap
      style={{
        position: "absolute",
        background: 'blue',
        height: '.5em',
        top: 0,
        left: 0,
      }}
      frames={[
        { offset: 0, transform: 'translateX(-75%)' },
        { offset: 1, transform: 'translateX(0)' }
      ]}
    />
  </Snap>
}

const App = () => (
  <>
    <Example dir='x' style={{
      width: '100%',
      height: '25vh',
      margin: 'auto',
    }} />
    <Example dir='y' style={{
      width: '90%',
      height: '70vh',
      margin: '1em auto',
    }}
    />
  </>
);
export default App
```

## License

MIT © [aminroosta](https://github.com/aminroosta)
