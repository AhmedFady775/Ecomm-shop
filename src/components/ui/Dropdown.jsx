import { motion, AnimatePresence } from "framer-motion";

export default function Dropdown(props) {
  return (
    <AnimatePresence>
      {props.open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative inline-block"
        >
          <div className="absolute bg-white right-4 rotate-45 h-4 w-4 mt-[3px] border-t border-l z-30"></div>
          <div
            className={`absolute border ${
              props.anchorRight ? "right-0" : null
            } mt-[10px] w-[200px] bg-white shadow-lg rounded-lg py-2`}
          >
            {props.children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
