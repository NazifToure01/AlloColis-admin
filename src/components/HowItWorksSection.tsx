import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Car, Package2 } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';
const HowItWorksSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

  const scaleProgress = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [0.8, 1]),
    springConfig
  );

  const opacityProgress = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [0, 1]),
    springConfig
  );

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

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
      y: -10,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const stepVariants = {
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
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
  };

  const iconVariants = {
    hover: {
      rotate: [0, -10, 10, 0],
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.section
      ref={containerRef}
      id='how-it-works'
      className='py-20 bg-gray-50 overflow-hidden'
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
    >
      <div className='container mx-auto px-4'>
        <motion.div
          className='text-center mb-16'
          variants={titleVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2
            className='text-4xl font-bold mb-4 text-gray-900'
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Comment ça marche ?
          </motion.h2>
          <motion.p
            className='text-gray-600 text-lg max-w-2xl mx-auto'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Découvrez comment rejoindre notre communauté, que vous soyez
            Voyageur ou expéditeur. Une solution simple, sécurisée et économique
            pour vos envois.
          </motion.p>
        </motion.div>

        <motion.div
          className='grid md:grid-cols-2 gap-12'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Section Expéditeurs */}
          <motion.div
            variants={cardVariants}
            whileHover='hover'
            className='bg-white p-8 rounded-xl shadow-lg transition-all duration-300'
          >
            <motion.div
              className='flex items-center gap-3 mb-8'
              whileHover='hover'
            >
              <motion.div variants={iconVariants}>
                <Package2 className='w-8 h-8 text-blue-600' />
              </motion.div>
              <h3 className='text-2xl font-semibold text-gray-900'>
                Pour les expéditeurs
              </h3>
            </motion.div>

            <div className='space-y-8'>
              {[
                {
                  image: '/images/rechercher.png',
                  title: 'Étape 1 : Recherchez',
                  description: 'Trouvez un Voyageur par pays, date et prix.',
                },
                {
                  image: '/images/colis.png',
                  title: 'Étape 2 : Sélectionnez',
                  description:
                    'Choisissez un Voyageur de confiance parmi ceux disponibles.',
                },
                {
                  image: '/images/avion.png',
                  title: 'Étape 3 : Suivez',
                  description:
                    'Confiez votre colis et suivez son acheminement en temps réel.',
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  variants={stepVariants}
                  whileHover='hover'
                  className='flex gap-6 items-center'
                >
                  <motion.div
                    className='flex-shrink-0'
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image
                      src={step.image}
                      alt={step.title}
                      className='w-20 h-20'
                      width={400}
                      height={400}
                    />
                  </motion.div>
                  <div>
                    <h4 className='font-semibold text-lg text-gray-900 mb-2'>
                      {step.title}
                    </h4>
                    <p className='text-gray-600'>{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Section Transporteurs */}
          <motion.div
            variants={cardVariants}
            whileHover='hover'
            className='bg-white p-8 rounded-xl shadow-lg transition-all duration-300'
          >
            <motion.div
              className='flex items-center gap-3 mb-8'
              whileHover='hover'
            >
              <motion.div variants={iconVariants}>
                <Car className='w-8 h-8 text-blue-600' />
              </motion.div>
              <h3 className='text-2xl font-semibold text-gray-900'>
                Pour les Voyageurs
              </h3>
            </motion.div>

            <div className='space-y-8'>
              {[
                {
                  image: '/images/voyageur.png',
                  title: 'Étape 1 : Publiez',
                  description:
                    'Annoncez votre trajet avec destination, dates et espace disponible.',
                },
                {
                  image: '/images/request.png',
                  title: 'Étape 2 : Recevez',
                  description:
                    "Acceptez les demandes d'expéditeurs qui correspondent à vos critères.",
                },
                {
                  image: '/images/money.png',
                  title: 'Étape 3 : Gagnez',
                  description:
                    'Transportez les colis et recevez votre rémunération après livraison.',
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  variants={stepVariants}
                  whileHover='hover'
                  className='flex gap-6 items-center'
                >
                  <motion.div
                    className='flex-shrink-0'
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image
                      src={step.image}
                      alt={step.title}
                      className='w-20 h-20'
                      width={400}
                      height={400}
                    />
                  </motion.div>
                  <div>
                    <h4 className='font-semibold text-lg text-gray-900 mb-2'>
                      {step.title}
                    </h4>
                    <p className='text-gray-600'>{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HowItWorksSection;
