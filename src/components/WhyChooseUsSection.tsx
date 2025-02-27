import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { CreditCard, Leaf, Phone, Plane, Shield, Users } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

const WhyChooseUsSection = ({
  setIsDownloadModalOpen,
}: {
  setIsDownloadModalOpen: (open: boolean) => void;
}) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
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

  const imageVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
    hover: {
      scale: 1.03,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, x: 20 },
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
      backgroundColor: '#F8FAFC',
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 10,
      },
    },
    hover: {
      rotate: [0, -10, 10, 0],
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  const features = [
    {
      icon: <Plane className='w-6 h-6 text-blue-600' />,
      title: 'Flexibilité et rapidité',
      description:
        'Des envois rapides et adaptés à vos besoins, sans délais inutiles.',
    },
    {
      icon: <Users className='w-6 h-6 text-blue-600' />,
      title: 'Une communauté de confiance',
      description:
        'Profils vérifiés et évaluations transparentes pour des échanges sécurisés.',
    },
    {
      icon: <CreditCard className='w-6 h-6 text-blue-600' />,
      title: 'Optimisation des coûts',
      description:
        "Des tarifs compétitifs grâce à l'optimisation des capacités de transport.",
    },
    {
      icon: <Shield className='w-6 h-6 text-blue-600' />,
      title: 'Traçabilité totale',
      description:
        "Suivez votre colis en temps réel, de l'envoi à la livraison.",
    },
    {
      icon: <Leaf className='w-6 h-6 text-blue-600' />,
      title: 'Engagement écologique',
      description:
        "Réduisez l'empreinte carbone en utilisant des capacités de transport existantes.",
    },
    {
      icon: <Phone className='w-6 h-6 text-blue-600' />,
      title: 'Support personnalisé',
      description: 'Une équipe dédiée pour vous accompagner à chaque étape.',
    },
  ];

  return (
    <motion.section
      ref={sectionRef}
      className='py-20 bg-blue-50 overflow-hidden'
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
    >
      <div className='container mx-auto px-4'>
        <motion.div
          className='flex flex-col md:flex-row items-center gap-12'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Image Section */}
          <motion.div
            className='md:w-1/2'
            variants={imageVariants}
            whileHover='hover'
          >
            <motion.div
              className='relative overflow-hidden rounded-xl'
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              <Image
                src='/images/illustration.jpg'
                alt='Envoi de colis'
                className='rounded-xl shadow-xl cursor-pointer transition-all duration-300'
                width={500}
                height={500}
                onClick={() => setIsDownloadModalOpen(true)}
              />
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <motion.div className='md:w-1/2' variants={containerVariants}>
            <motion.h2
              className='text-4xl font-bold mb-8 text-gray-900 text-center md:text-start'
              variants={titleVariants}
            >
              Pourquoi choisir AlloColis ?
            </motion.h2>

            <motion.div className='space-y-4' variants={containerVariants}>
              {features.map((feature, index) => (
                <FeatureItem
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  variants={featureVariants}
                  iconVariants={iconVariants}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

const FeatureItem = ({
  icon,
  title,
  description,
  variants,
  iconVariants,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  variants: any;
  iconVariants: any;
}) => (
  <motion.div
    className='flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm transition-all duration-300'
    variants={variants}
    whileHover='hover'
  >
    <motion.div
      className='flex-shrink-0'
      variants={iconVariants}
      whileHover='hover'
    >
      {icon}
    </motion.div>
    <div>
      <motion.h3
        className='font-semibold text-gray-900'
        whileHover={{ x: 5 }}
        transition={{ duration: 0.2 }}
      >
        {title}
      </motion.h3>
      <motion.p
        className='text-gray-600'
        initial={{ opacity: 0.8 }}
        whileHover={{ opacity: 1 }}
      >
        {description}
      </motion.p>
    </div>
  </motion.div>
);

export default WhyChooseUsSection;
