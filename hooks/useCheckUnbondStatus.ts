import { decryptHash } from '@xfi/helpers';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { UnbondStatusDto } from '@/crud';
import { SECRET_KEY } from '@/shared/constants';

const useCheckUnbondStatus = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<UnbondStatusDto>({
    date: '2024-04-18T21:00:00.046Z',
    validators: [
      'mxvaloper15vaxer4jfr2mhg6qaqspr0z44aj3jvfepw9kf4',
      'mxvaloper1gza5y94kal25eawsenl56th8kdyujszmcsxcgs',
    ],
    exceptionAddresses: [
      'mx1edwkfdukvqxgnswuagza5a7a9dlzka4fx0p5p5',
      'mx1vs2k9fmzndw9kdv52uhvjd5se4dgevxpc7xr9a',
      'mx1jpkctt56zh57h98zx5eyqdtxgv2mz26nfuzqrw',
    ],
    isDatePast: new Date() > new Date('2024-04-18T21:00:00.046Z'),
  });

  const check = async () => {
    try {
      setIsLoading(true);
      const { data: response } = await axios.get('/api/check-status');

      const value = decryptHash(SECRET_KEY, response.hash);

      setData(JSON.parse(value));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    check();
  }, []);

  return { data, isLoading };
};

export default useCheckUnbondStatus;
