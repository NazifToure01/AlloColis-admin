import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Check } from 'lucide-react';
import { useRef } from 'react';

export default function PricingSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

  const scaleProgress = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [0.95, 1]),
    springConfig
  );

  const opacityProgress = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [0, 1]),
    springConfig
  );

  const features = [
    "Pas de frais d'inscription",
    "Publication d'annonce gratuite pour toute première inscription",
    'Support client prioritaire',
    'Paiement non requis',
    'Messages instantanés',
    'Système de médiation gratuit',
    "Tarification flexible en fonction de la durée de visibilité de l'annonce",
    "Optimisation des coûts grâce à l'économie collaborative",
  ];

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const priceVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
      },
    },
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    hover: {
      x: 5,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
  };

  const checkIconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
      },
    },
    hover: {
      scale: 1.2,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      className='py-20 bg-gray-50 overflow-hidden'
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
    >
      <div className='container mx-auto px-4'>
        <motion.h2
          className='text-3xl font-bold text-gray-900 text-center mb-12'
          variants={titleVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
        >
          Tarifs transparents
        </motion.h2>

        <div className='max-w-3xl mx-auto'>
          <motion.div
            className='bg-white rounded-lg shadow-xl overflow-hidden'
            variants={cardVariants}
            initial='hidden'
            whileInView='visible'
            whileHover='hover'
            viewport={{ once: true, margin: '-50px' }}
          >
            <motion.div
              className='px-6 py-8 bg-blue-600 text-white text-center'
              variants={headerVariants}
            >
              <motion.h3
                className='text-2xl font-bold mb-2'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Commission par annonce
              </motion.h3>
              <motion.div
                className='text-5xl font-bold mb-2'
                variants={priceVariants}
              >
                0€
              </motion.div>
              <motion.p
                className='text-blue-100'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                du montant de la transaction
              </motion.p>
            </motion.div>

            <motion.div
              className='p-6'
              variants={listVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
            >
              <ul className='space-y-4'>
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    className='flex items-start gap-3'
                    variants={listItemVariants}
                    whileHover='hover'
                  >
                    <motion.div variants={checkIconVariants} whileHover='hover'>
                      <Check className='w-6 h-6 text-green-500 flex-shrink-0' />
                    </motion.div>
                    <motion.span
                      className='text-gray-900'
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {feature}
                    </motion.span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
