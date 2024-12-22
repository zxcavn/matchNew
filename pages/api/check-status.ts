import { createHash } from '@xfi/helpers';
import type { NextApiRequest, NextApiResponse } from 'next';

import { EncryptedUnbondStatus } from '@/crud';
import { SECRET_KEY } from '@/shared/constants';

const DISABLED_VALIDATORS = [
  'mxvaloper15vaxer4jfr2mhg6qaqspr0z44aj3jvfepw9kf4',
  'mxvaloper1gza5y94kal25eawsenl56th8kdyujszmcsxcgs',
  'mxvaloper15vaxer4jfr2mhg6qaqspr0z44aj3jvfepw9kf4',
  'mxvaloper1gza5y94kal25eawsenl56th8kdyujszmcsxcgs',
];
const EXCEPTION_ADDRESSES = [
  'mx1edwkfdukvqxgnswuagza5a7a9dlzka4fx0p5p5',
  'mx1vs2k9fmzndw9kdv52uhvjd5se4dgevxpc7xr9a',
  'mx1jpkctt56zh57h98zx5eyqdtxgv2mz26nfuzqrw',
];
const COMPLETE_DATE = '2024-04-18T21:00:00.046Z';

export default function handler(req: NextApiRequest, res: NextApiResponse<EncryptedUnbondStatus>) {
  const isDatePast = new Date() > new Date(COMPLETE_DATE);
  const hash = createHash(
    SECRET_KEY,
    JSON.stringify({
      exceptionAddresses: EXCEPTION_ADDRESSES,
      validators: DISABLED_VALIDATORS,
      date: COMPLETE_DATE,
      isDatePast,
    })
  );

  res.status(200).json({ hash });
}
