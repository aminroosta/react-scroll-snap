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

type SnapY = React.FC<{
  children?: React.ReactElement<{
    frames?: Keyframe[],
    children: React.ReactNode,
    style?: React.CSSProperties,
    className?: string
  }>[],
}>;
export const SnapY: SnapY = ({ children }) => {
  // @ts-ignore
  let root = useRef(null as HTMLDivElement);
  let refs = [] as React.MutableRefObject<HTMLElement>[];
  let props_arr = [] as any[];

  const pages_snapped = [] as any[];
  const pages_skipped = [] as any[];

  React.Children.forEach(children, child => {
    // @ts-ignore
    const ref = useRef(null as HTMLElement);
    refs.push(ref);

    const props = child && child.props || {} as any;
    props_arr.push(props);

    // @ts-ignore
    const clone = React.cloneElement(child, { ref });

    (props.skip_snap) ? pages_skipped.push(clone) : pages_snapped.push(clone);
  });


  function on_scroll(animations: Animation[]) {
    const scroll = root.current.scrollTop / (root.current.scrollHeight - root.current.clientHeight);

    console.log({
      scrollTop: root.current.scrollTop,
      scrollHeight: root.current.scrollHeight,
      offsetHeight: root.current.offsetHeight
    })

    animations.forEach(a => {
      a.currentTime = scroll * 10000;
    });
    console.log(scroll)
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
      console.log(frames);
      let animation = r.current.animate(
        frames, { iterations: 1, fill: 'both', duration: 10000 }
      );
      animation.pause();
      animations.push(animation);
    });

    return () => root.current.removeEventListener('scroll', callback);
  }, []);

  return <div className={styles.wrapper}>
    <div ref={root} className={styles.snap_y}>
      {pages_snapped}
    </div>
    {pages_skipped}
  </div>
}
