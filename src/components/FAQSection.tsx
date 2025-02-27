import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Comment fonctionne AlloColis ?',
    answer:
      'AlloColis est une plateforme qui met en relation les expéditeurs avec des transporteurs. Il suffit de publier votre annonce, de recevoir des offres de transport et de choisir celle qui vous convient le mieux.',
  },
  {
    question: 'Quels types de colis puis-je expédier ?',
    answer:
      'Vous pouvez expédier pratiquement tous types de colis légaux, des petits paquets aux objets volumineux, en passant par les meubles et les véhicules.',
  },
  {
    question: 'Comment sont sélectionnés les transporteurs ?',
    answer:
      'Tous nos transporteurs sont vérifiés et doivent fournir leurs documents professionnels. Nous vérifions leur assurance et leurs avis clients pour garantir un service de qualité.',
  },
  {
    question: 'Quels sont les délais de livraison ?',
    answer:
      'Les délais varient selon la distance et le type de transport. Chaque transporteur indique son délai estimé dans son offre.',
  },
  {
    question: 'Comment puis-je payer ?',
    answer:
      'Nous acceptons plusieurs moyens de paiement sécurisés : carte bancaire, virement bancaire et PayPal.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className='py-16 bg-gray-50'>
      <div className='max-w-4xl mx-auto px-4'>
        <h2 className='text-4xl font-bold text-center mb-12'>
          Questions Fréquentes
        </h2>
        <div className='space-y-4'>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className='bg-white rounded-lg shadow-md overflow-hidden'
            >
              <button
                className='w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50'
                onClick={() => toggleFAQ(index)}
              >
                <span className='font-medium text-lg'>{faq.question}</span>
                <span className='text-blue-500'>
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className='px-6 py-4 bg-white'>
                  <p className='text-gray-600'>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
