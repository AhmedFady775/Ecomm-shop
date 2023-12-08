import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";

export default function DropDownList(props) {
  return (
    <AnimatePresence>
      {props.open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative inline-block z-[-10]"
        >
          <Helmet>
            <body className={props.open ? "overflow-y-hidden" : " "} />
          </Helmet>
          <div className="fixed inset-0 bg-black/70"></div>
          <div
            className={`absolute ${
              props.anchorRight ? "right-0" : null
            } mt-4 w-[300px] bg-white shadow-lg rounded-b-lg z-30`}
          >
            {props.children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
