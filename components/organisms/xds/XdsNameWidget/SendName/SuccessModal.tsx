import { Typography } from '@mui/material';
import { trimStringAndInsertDots } from '@xfi/helpers';

import type { ModalProps } from '@/lib/xfi.lib/components/atoms';

import { type XdsPricingBlockProps, XdsPricingBlock, XdsSuccessOperationModal } from '@/components/molecules';

type Props = Pick<ModalProps, 'isOpen' | 'setIsOpen'> & {
  name: string;
  address: string;
  pricingBlockProps: XdsPricingBlockProps;
};

const SuccessModal = ({ name, address, pricingBlockProps, ...modalProps }: Props) => {
  return (
    <XdsSuccessOperationModal
      {...modalProps}
      name={name}
      operationTitle="XDS.YOU_SENT_NAME"
      detailsSlot={<XdsPricingBlock {...pricingBlockProps} />}
      description={{
        text: 'XDS.YOU_HAVE_SUCCESSFULLY_SENT_NAME_TO',
        additional: (
          <Typography component="span" variant="body1" color="background.light">
            {trimStringAndInsertDots({
              value: address,
              charsBeforeDots: 6,
              charsAfterDots: 5,
            })}
          </Typography>
        ),
      }}
      button={{
        text: 'XDS.BACK_TO_ALL_NAMES',
        onClick: () => modalProps.setIsOpen(false),
      }}
    />
  );
};

export default SuccessModal;
