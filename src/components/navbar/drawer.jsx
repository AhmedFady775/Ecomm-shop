import { RiCloseLine } from "react-icons/ri";
import { Helmet } from "react-helmet";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export default function Drawer({ open, setOpen, navbarLinks, pathname }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ left: "-100%" }}
          animate={{ left: 0 }}
          exit={{ left: "-100%" }}
          transition={{
            type: "tween",
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="absolute top-0 z-[var(--z-navbar)] flex h-screen w-full flex-row overflow-hidden"
        >
          <div className="flex w-[80%] flex-col bg-white text-black">
            <div className="flex h-[60px] items-center justify-end p-4">
              <RiCloseLine onClick={() => setOpen(!open)} size={30} />
            </div>
            <div className="flex flex-col">
              {navbarLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <div
                    onClick={() => setOpen(!open)}
                    className={`phone:border-none mx-4 border-b py-4 text-base ${
                      pathname === link.href ? "text-gold" : null
                    }`}
                  >
                    {link.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "tween",
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="flex w-[20%] bg-black/60 backdrop-blur-[4px]"
            onClick={() => setOpen(!open)}
          />
          <Helmet>
            <body className={open && "overflow-y-hidden"} />
          </Helmet>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
