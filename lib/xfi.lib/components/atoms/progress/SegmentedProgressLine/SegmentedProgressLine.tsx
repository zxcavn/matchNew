import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { Tooltip } from '../../../../../../components/atoms/Tooltip';
import { useIntlHelpers } from '../../../../i18n';
import { getPercent } from '../helpers';
import { StyledSegmentedProgressLine } from './styles';

export const TEST_ID = 'segmented-progress-line-test-id';
export const SEGMENT_TEST_ID = 'segment-test-id';

type Segment = {
  background: string;
  value: number;
  name: string;
};

type SegmentWithPercent = Segment & {
  percent: string | number;
};

type Props = {
  segments?: Segment[];
  className?: string;
};

const SegmentedProgressLine = ({ segments, className }: Props) => {
  const { isFormattedMessageId } = useIntlHelpers();
  const { segmentsToRender, isEmpty } = useMemo(() => {
    const totalValue = (segments || []).reduce((acc, segment) => acc + segment.value, 0);
    const segmentsToRender: SegmentWithPercent[] = [];

    (segments || []).forEach(segment => {
      if (segment.value > 0) {
        segmentsToRender.push({ ...segment, percent: getPercent({ currentValue: segment.value, totalValue }) });
      }
    });

    const isEmpty = !segmentsToRender.length;

    return { segmentsToRender, isEmpty };
  }, [segments]);

  return (
    <StyledSegmentedProgressLine $isEmpty={isEmpty} className={className} data-testid={TEST_ID}>
      {segmentsToRender?.map(item => (
        <Tooltip
          key={item.background}
          title={
            <Typography variant="body2">
              {isFormattedMessageId(item.name) ? <FormattedMessage id={item.name} /> : item.name}, {item.percent}%
            </Typography>
          }
        >
          <Box
            className={'progress'}
            sx={{
              background: item.background,
              width: `${item.percent}%`,
            }}
            data-testid={SEGMENT_TEST_ID}
          />
        </Tooltip>
      ))}
    </StyledSegmentedProgressLine>
  );
};

export default SegmentedProgressLine;
