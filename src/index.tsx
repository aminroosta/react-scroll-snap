import * as React from 'react'
import styles from './styles.module.css'

// @ts-ignore
const { useRef, useState, useEffect } = React;

type Page = React.FC<{
  frames?: Keyframe[],
  skip_snap?: boolean,
  children?: React.ReactNode | undefined,
  style?: React.CSSProperties,
  className?: string
}>;

// @ts-ignore
export const Page: Page = React.forwardRef(
  ({ children, className = '', style = {} }, ref) => (
    <div
      // @ts-ignore
      ref={ref}
      style={style}
      className={`${className} ${styles.page}`}
    >{children}</div>
  )
);

type Snap = React.FC<{
  style?: React.CSSProperties,
  dir: 'x' | 'y',
  children?: React.ReactElement<{
    frames?: Keyframe[],
    children: React.ReactNode,
    style?: React.CSSProperties,
    className?: string
  }>[],
}>;
export const Snap: Snap = ({ children, style, dir}) => {
  // @ts-ignore
  dir = dir.toLowerCase();
  // @ts-ignore
  let root = useRef(null as HTMLDivElement);
  let refs = [] as React.MutableRefObject<HTMLElement>[];
  let props_arr = [] as any[];

  const pages_snapped = [] as any[];
  const pages_skipped = [] as any[];

  React.Children.forEach(children, (child, idx) => {
    // @ts-ignore
    const ref = useRef(null as HTMLElement);
    refs.push(ref);

    const props = child && child.props || {} as any;
    props_arr.push(props);

    // @ts-ignore
    const clone = React.cloneElement(child, { ref, key: idx });

    (props.skip_snap) ? pages_skipped.push(clone) : pages_snapped.push(clone);
  });


  function on_scroll(animations: Animation[]) {
    let scroll = 0;
    let r = root.current;
    if (dir === 'y') {
      scroll = r.scrollTop / (r.scrollHeight - r.clientHeight);
    } else if (dir === 'x') {
      scroll = r.scrollLeft / (r.scrollWidth - r.clientWidth);
    }

    animations.forEach(a => {
      a.currentTime = scroll * 10000;
    });
  };

  useEffect(() => {
    const animations = [] as Animation[]
    const callback = () => on_scroll(animations);
    root.current.addEventListener('scroll', callback, { passive: true });

    refs.forEach((r, idx) => {
      const skip_snap = props_arr[idx].skip_snap;
      if (!skip_snap) {
        // @ts-ignore
        r.current.style.scrollSnapAlign = 'start';
      }

      const frames = props_arr[idx].frames || [];
      let animation = r.current.animate(
        frames, { iterations: 1, fill: 'both', duration: 10000 }
      );
      animation.pause();
      animations.push(animation);
    });

    return () => root.current.removeEventListener('scroll', callback);
  }, []);

  const className = dir === 'x' ? styles.snap_x : styles.snap_y;
  return <div style={style} className={styles.wrapper}>
    <div ref={root} className={className}>
      {pages_snapped}
    </div>
    {pages_skipped}
  </div>
}