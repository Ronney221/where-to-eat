import React, { useState, useEffect } from "react";
import { useSpring, animated, to } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import "./App.css";

const SwipeCard = ({ onSwipe }) => {
  const [gone, setGone] = useState(false);

  // Start with no horizontal offset, but hidden (opacity: 0)
  const [props, api] = useSpring(() => ({
    x: 0,
    rotate: 0,
    opacity: 0,
    config: { tension: 200, friction: 20 },
  }));

  // On mount, animate the card's opacity to 1 (fade in)
  useEffect(() => {
    api.start({ opacity: 1 });
  }, [api]);

  const bind = useGesture(
    {
      onDrag: ({ offset: [x], active }) => {
        const rotation = Math.max(-30, Math.min(30, (x / 300) * 30));

        if (!active && Math.abs(x) > 100) {
          const direction = x > 0 ? "right" : "left";
          // Animate off-screen
          api.start({
            x: x > 0 ? 300 : -300,
            rotate: x > 0 ? 30 : -30,
            opacity: 0,
            onRest: () => {
              onSwipe(direction);
              setGone(true);
            },
          });
        } else {
          // Update the card position and rotation as the user drags
          api.start({
            x: active ? x : 0,
            rotate: active ? rotation : 0,
            opacity: 1,
            immediate: active,
          });
        }
      },
    },
    { drag: { filterTaps: true } }
  );

  if (gone) return null;

  return (
    <animated.div
      {...bind()}
      style={{
        opacity: props.opacity,
        transform: to(
          [props.x, props.rotate],
          (x, r) => `translate3d(${x}px, 0, 0) rotate(${r}deg)`
        ),
      }}
      className="swipe-card"
    >
      <h2>Swipe Me!</h2>
    </animated.div>
  );
};

export default SwipeCard;
