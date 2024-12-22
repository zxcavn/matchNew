import { ElementType } from 'react';

import { CryptaleIcon, DigitalAlchemistIcon, MineClubIcon, VietnamIcon } from '@/public/icons';

export const VIEW_BOX_DEFAULT = '0 0 32 32';

export type Validator = {
  name?: string;
  operator_address: string;
  iconSrc?: ElementType;
  viewBox?: string;
};

export const VALIDATORS: Validator[] = [
  // DEV VALIDATORS
  {
    name: 'CrossFi 1',
    operator_address: 'mxvaloper1f83rnk6s2kqcdl0knp8dj6p5s9u5km92qmc8qh',
  },
  {
    name: 'CrossFi 2',
    operator_address: 'mxvaloper1nwv0scqsz0hprwyd6gpvj4ykt3v7ztn97kjwc5',
  },
  {
    name: 'CrossFi 3',
    operator_address: 'mxvaloper143ywplf267u9u4lwfrul0qmxrh74r853dfja2g',
  },
  {
    name: 'CrossFi 4',
    operator_address: 'mxvaloper1k646g4axhsh9xyvlk3pfq0aqrrsyj6qqj85d5m',
  },
  {
    name: 'CrossFi 5',
    operator_address: 'mxvaloper1a7fgc2vglascsllhk3emh3flzzjaerjx5truz6',
  },
  {
    name: 'CrossFi 6',
    operator_address: 'mxvaloper17qj66wq56dmh7zpurj966kdzks9dnfmhv26s92',
  },
  {
    name: 'CrossFi 7',
    operator_address: 'mxvaloper17u9dufjvscqh56u4kd7ag236u0wu3zrw9e8fwc',
  },
  {
    name: 'CrossFi 8',
    operator_address: 'mxvaloper1l9mzj93d4wltg5vu5flt7zdy36yzj36qcjmqc2',
  },

  // PROD VALIDATORS
  {
    operator_address: 'mxvaloper15vaxer4jfr2mhg6qaqspr0z44aj3jvfepw9kf4',
    iconSrc: VietnamIcon,
    viewBox: '0 0 24 24',
  },
  {
    operator_address: 'mxvaloper1gza5y94kal25eawsenl56th8kdyujszmcsxcgs',
    iconSrc: VietnamIcon,
    viewBox: '0 0 24 24',
  },
  {
    operator_address: 'mxvaloper175jyetpvdtrg4xqhdmrxytcmraw7g6cxw3r9vz',
    iconSrc: DigitalAlchemistIcon,
    viewBox: '0 0 1024 1024',
  },
  {
    operator_address: 'mxvaloper1mh547jhv34vu904he9qvxlagmq649ul39a0c08',
    iconSrc: CryptaleIcon,
    viewBox: '0 0 1003.2 1003.2',
  },
  {
    operator_address: 'mxvaloper1342mh8rcezvc56ty6fmf679n8kznyytv20vyt6',
    iconSrc: MineClubIcon,
    viewBox: '0 0 24 24',
  },
];

type GroupedByAddress = { [address: string]: Validator | undefined };

const groupByAddress = (): GroupedByAddress => {
  return VALIDATORS.reduce(
    (acc, validator) => ((acc[validator.operator_address] = validator), acc),
    {} as GroupedByAddress
  );
};

export const GROUPED_VALIDATORS_BY_ADDRESS = groupByAddress();
