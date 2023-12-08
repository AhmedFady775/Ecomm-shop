import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal(props) {
  return (
    <AnimatePresence>
      {props.open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex fixed inset-0 min-h-screen justify-center items-center"
        >
          {/* <Helmet>
            <body className={props.open ? "overflow-y-hidden" : " "} />
          </Helmet> */}
          <div
            onClick={props.onClose}
            className="fixed inset-0 bg-black/70 z-[9998]"
          ></div>
          <div
            className={
              "p-4 min-w-[300px] bg-white shadow-lg rounded-lg z-[9999]"
            }
          >
            {props.children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
