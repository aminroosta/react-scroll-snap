import * as React from 'react'
import styles from './styles.module.css'

// @ts-ignore
const { useRef, useState, useEffect } = React;

type Page = React.FC<{
  frames?: Keyframe[],
  children: React.ReactNode
}>;

export const Page: Page = ({ children, frames = [] }) => {
  return <div>{children}</div>
}

type SnapY = React.FC<{
  children?: React.ReactNode,
  keyframes?: Keyframe[]
}>;
export const SnapY: SnapY = ({ children, keyframes = [] }) => {
  // @ts-ignore
  let root = useRef(null as HTMLDivElement);
  let refs: React.MutableRefObject<HTMLElement>[] = [];
  let count = React.Children.count(children);

  let pages = React.Children.map(children, child => {
    // @ts-ignore
    const ref = useRef(null);
    // @ts-ignore
    refs.push(ref);
    // @ts-ignore
    return React.cloneElement(child, { ref });
  });


  function on_scroll(animations: Animation[]) {
    const scroll = root.current.scrollTop / (root.current.scrollHeight - root.current.offsetHeight) * (count - 1);

    animations.forEach((a, idx) => {
      let progress = scroll - Math.max(0, idx - 1);
      progress = Math.max(0, Math.min(progress, 2));
      a.currentTime = progress * 1000;
    });
  };

  useEffect(() => {
    const animations = [] as Animation[]
    const callback = () => on_scroll(animations);
    root.current.addEventListener('scroll', callback, { passive: true });

    refs.forEach((r, idx) => {
      // @ts-ignore
      r.current.style.scrollSnapAlign = 'start';

      if (idx >= keyframes.length) {
        return;
      }

      let from = Math.max(idx - 1, 0);
      let to = Math.min(idx + 2, count);
      let frames = keyframes.slice(from, to);
      let duration = (frames.length - 1) * 1000;
      let animation = r.current.animate(
        frames, { iterations: 1, fill: 'both', duration }
      );
      animation.pause();
      animations.push(animation);
    });

    return () => root.current.removeEventListener('scroll', callback);
  }, []);

  return <div ref={root} className={styles.snap_y}>
    {pages}
  </div>
}
