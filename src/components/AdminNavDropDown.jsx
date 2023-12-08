import { CSSTransition } from "react-transition-group";
import { useRef } from "react";

export default function AdminNavDropDown(props) {
  const duration = 500;
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={props.open}
      timeout={duration}
      classNames="my-height"
      unmountOnExit
    >
      <div ref={nodeRef}>{props.children}</div>
    </CSSTransition>
  );
}
