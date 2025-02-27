import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Testimonials() {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
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

  const testimonials = [
    {
      name: 'Marie K.',
      role: 'Expéditrice',
      content:
        "AlloColis m'a permis d'envoyer des médicaments à ma famille au Bénin rapidement et à moindre coût. Le service est vraiment fiable !",
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    },
    {
      name: 'Thomas M.',
      role: 'Voyageur',
      content:
        'Une excellente façon de rentabiliser mes voyages tout en aidant la communauté. La plateforme est très intuitive.',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
    },
    {
      name: 'Sarah L.',
      role: 'Expéditrice',
      content:
        "Je recommande vivement ! Les vérifications d'identité me rassurent et le support client est très réactif.",
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
    },
    {
      name: 'Jean D.',
      role: 'Voyageur régulier',
      content:
        "J'utilise AlloColis chaque mois pour mes voyages entre la France et le Sénégal. Un vrai gain de temps !",
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
    },
    {
      name: 'Aminata B.',
      role: 'Expéditrice',
      content:
        "Service exceptionnel ! J'ai pu envoyer des colis à ma famille au Mali en toute sécurité.",
      image:
        'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&q=80',
    },
  ];
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  useEffect(() => {
    const interval = setInterval(nextPage, 5000);
    return () => clearInterval(interval);
  }, [currentPage, totalPages]);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const starVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 10,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      backgroundColor: '#F9FAFB',
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const paginationDotVariants = {
    inactive: {
      scale: 1,
      backgroundColor: '#D1D5DB',
    },
    active: {
      scale: 1.2,
      backgroundColor: '#3B82F6',
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.section
      ref={containerRef}
      className='py-20 bg-gray-50 overflow-hidden'
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
    >
      <div className='container mx-auto px-4'>
        <motion.h2
          className='text-3xl font-bold text-center md:text-start text-gray-900 mb-12'
          variants={titleVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
        >
          Ce que disent nos utilisateurs
        </motion.h2>

        <div className='relative'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentPage}
              className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
              variants={containerVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: '-50px' }}
            >
              {testimonials
                .slice(
                  currentPage * itemsPerPage,
                  (currentPage + 1) * itemsPerPage
                )
                .map((testimonial, index) => (
                  <motion.div
                    key={index}
                    className='bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-all'
                    variants={cardVariants}
                    whileHover='hover'
                    layout
                  >
                    <motion.div className='flex items-center mb-4'>
                      <motion.img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className='w-12 h-12 rounded-full mr-4 object-cover'
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 0.2 }}
                      />
                      <div>
                        <motion.h3
                          className='font-semibold text-gray-900'
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.2 }}
                        >
                          {testimonial.name}
                        </motion.h3>
                        <motion.p className='text-gray-600 text-sm'>
                          {testimonial.role}
                        </motion.p>
                      </div>
                    </motion.div>

                    <motion.div className='flex mb-4 space-x-1'>
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          variants={starVariants}
                          custom={i}
                          whileHover={{ scale: 1.2, rotate: 180 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Star className='w-5 h-5 text-yellow-400 fill-current' />
                        </motion.div>
                      ))}
                    </motion.div>

                    <motion.p
                      className='text-gray-700'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 * index }}
                    >
                      {testimonial.content}
                    </motion.p>
                  </motion.div>
                ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className='flex justify-center items-center mt-8 gap-4'>
            <motion.button
              onClick={prevPage}
              className='p-2 rounded-full bg-white shadow-md'
              variants={buttonVariants}
              whileHover='hover'
              whileTap='tap'
              aria-label='Témoignage précédent'
            >
              <ChevronLeft className='w-6 h-6' />
            </motion.button>

            <div className='flex gap-2'>
              {[...Array(totalPages)].map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className='w-2 h-2 rounded-full'
                  variants={paginationDotVariants}
                  animate={currentPage === i ? 'active' : 'inactive'}
                  whileHover={{ scale: 1.3 }}
                  aria-label={`Page ${i + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextPage}
              className='p-2 rounded-full bg-white shadow-md'
              variants={buttonVariants}
              whileHover='hover'
              whileTap='tap'
              aria-label='Témoignage suivant'
            >
              <ChevronRight className='w-6 h-6' />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
