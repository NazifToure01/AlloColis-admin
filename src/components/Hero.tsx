import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import type { SwiperRef } from 'swiper/react';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function Hero() {
  const containerRef = useRef(null);
  const swiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

  const scaleProgress = useSpring(
    useTransform(scrollYProgress, [0, 1], [1, 0.8]),
    springConfig
  );

  const opacityProgress = useSpring(
    useTransform(scrollYProgress, [0, 1], [1, 0]),
    springConfig
  );

  const yProgress = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 100]),
    springConfig
  );

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.4,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
  };

  const lottieVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        delay: 0.3,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      className='relative bg-gradient-to-r from-blue-300 to-blue-700 min-h-screen'
      initial='hidden'
      animate='visible'
      style={{
        scale: prefersReducedMotion ? 1 : scaleProgress,
        opacity: opacityProgress,
      }}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20'>
        <motion.div
          className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-20'
          style={{ y: prefersReducedMotion ? 0 : yProgress }}
        >
          {/* Content Section */}
          <motion.div className='flex-1 space-y-8'>
            <motion.div variants={titleVariants}>
              <h1 className='text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl'>
                <motion.span
                  className='block text-center md:text-start'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Réinventez l'envoi
                </motion.span>
                <motion.span
                  className='block text-black mt-2  text-center md:text-start'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  de petits colis
                </motion.span>
              </h1>
            </motion.div>

            <motion.p
              variants={descriptionVariants}
              className='text-lg text-gray-100 sm:text-xl md:text-2xl max-w-2xl '
            >
              Un service économique et rapide pour la diaspora africaine en
              France, reliant les expéditeurs aux voyageurs ayant de l'espace
              dans leurs bagages.
            </motion.p>

            <motion.div
              className='flex flex-col sm:flex-row gap-4'
              variants={buttonVariants}
            >
              <motion.a
                href='#download'
                className='flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition duration-200 shadow-lg hover:shadow-xl'
                whileHover='hover'
                whileTap={{ scale: 0.95 }}
              >
                Commencer maintenant
              </motion.a>
              <motion.a
                href='#how-it-works'
                className='flex items-center justify-center px-8 py-4 border-2 border-blue-300 text-lg font-medium rounded-xl bg-blue-50 text-blue-700 transition duration-200'
                whileHover='hover'
                whileTap={{ scale: 0.95 }}
              >
                En savoir plus
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Lottie Animation Section */}
          {isClient && (
            <motion.div
              variants={lottieVariants}
              className='flex-1 h-96 lg:h-[600px]'
            >
              <motion.div
                className='h-full w-full'
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className='h-full w-full relative bg-transparent rounded-3xl'>
                  <Lottie
                    animationData={require('/public/lotties/lottie4.json')}
                    loop={true}
                    autoplay={true}
                    className='h-full w-full object-contain'
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
