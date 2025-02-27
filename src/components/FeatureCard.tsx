import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className='bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow'>
      <div className='mb-4'>{icon}</div>
      <h3 className='text-xl mb-2 text-gray-900 font-extrabold'>{title}</h3>
      <p className='text-gray-600'>{description}</p>
    </div>
  );
}
