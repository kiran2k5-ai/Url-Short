import { motion } from "framer-motion";

export const fadeUp = {
    hidden: {
        opacity: 0,
        y: 50
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6
        }
    }
};

export const cardHover = {
    whileHover: {
        y: -10,
        scale: 1.03,
        transition: {
            duration: 0.3
        }
    }
};

export const buttonHover = {
    whileHover: {
        scale: 1.05
    },
    whileTap: {
        scale: 0.95
    }
};