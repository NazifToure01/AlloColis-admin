'use client';

import { api } from '@/services/api';
import { MapPin, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Place {
  description: string;
  place_id: string;
}

interface PlacesInputProps {
  onPlaceSelected: (data: any, details: any) => void;
  placeholder?: string;
  value?: string;
}

const PlacesInput: React.FC<PlacesInputProps> = ({
  onPlaceSelected,
  placeholder,
  value = '',
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [predictions, setPredictions] = useState<Place[]>([]);
  const [selectedAddress, setSelectedAddress] = useState(value);

  const searchPlaces = async (text: string) => {
    if (text.length > 2) {
      try {
        const data = await api.location.search(text);
        if (data.predictions) {
          setPredictions(data.predictions);
        }
      } catch (error) {
        console.error('Error fetching predictions:', error);
      }
    } else {
      setPredictions([]);
    }
  };

  const getPlaceDetails = async (placeId: string) => {
    try {
      const data = await api.location.search(placeId);
      return data.result;
    } catch (error) {
      console.error('Error fetching place details:', error);
      return null;
    }
  };

  const handlePlaceSelect = async (prediction: Place) => {
    try {
      const details = await getPlaceDetails(prediction.place_id);
      if (details) {
        setSelectedAddress(prediction.description);
        onPlaceSelected(prediction, details);
        setModalVisible(false);
        setSearchText('');
        setPredictions([]);
      }
    } catch (error) {
      console.error('Error selecting place:', error);
    }
  };

  useEffect(() => {
    setSelectedAddress(value);
  }, [value]);

  console.log(process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY);
  return (
    <>
      <button
        type='button'
        onClick={() => setModalVisible(true)}
        className='flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3'
      >
        <span className='mr-2 flex-1 truncate text-gray-600'>
          {selectedAddress || placeholder || 'Entrez une adresse'}
        </span>
        <MapPin className='h-6 w-6 text-gray-600' />
      </button>

      {modalVisible && (
        <div className='fixed inset-0 z-50 flex items-end bg-black bg-opacity-50'>
          <div className='h-4/5 w-full rounded-t-3xl bg-white p-5'>
            <div className='mb-5 flex items-center'>
              <button
                onClick={() => {
                  setModalVisible(false);
                  setSearchText('');
                  setPredictions([]);
                }}
                className='p-1'
              >
                <X className='h-6 w-6' />
              </button>
              <h2 className='ml-4 text-lg font-semibold'>
                Sélectionner une adresse
              </h2>
            </div>

            <div className='mb-3'>
              <input
                type='text'
                className='w-full rounded-lg border border-gray-200 px-4 py-3 text-base focus:border-blue-500 focus:outline-none'
                placeholder='Rechercher une adresse'
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  searchPlaces(e.target.value);
                }}
                autoFocus
              />
            </div>

            <div className='flex-1 overflow-auto'>
              {predictions.map((item) => (
                <button
                  key={item.place_id}
                  className='flex w-full items-center border-b border-gray-100 px-4 py-3 hover:bg-gray-50'
                  onClick={() => handlePlaceSelect(item)}
                >
                  <MapPin className='mr-3 h-5 w-5 text-gray-600' />
                  <span className='text-left text-base text-gray-800'>
                    {item.description}
                  </span>
                </button>
              ))}

              {searchText.length > 0 && (
                <button
                  className='w-full bg-gray-50 px-4 py-3 text-center text-base text-gray-600'
                  onClick={() => {
                    setSelectedAddress(searchText);
                    onPlaceSelected(
                      { description: searchText, place_id: 'manual' },
                      { formatted_address: searchText, geometry: null }
                    );
                    setModalVisible(false);
                    setSearchText('');
                    setPredictions([]);
                  }}
                >
                  Utiliser "{searchText}" comme adresse
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlacesInput;
