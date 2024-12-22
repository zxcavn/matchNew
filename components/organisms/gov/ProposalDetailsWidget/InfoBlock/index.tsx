import { Typography, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';

import { Collapse, CollapseHeader } from '@/lib/xfi.lib/components/atoms';
import { NONE_VALUE } from '@/lib/xfi.lib/constants';
import { AppThemeVariant } from '@/lib/xfi.lib/theme';

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });

type Props = {
  data?: string;
};

const InfoBlock = ({ data }: Props) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const parsedData = useMemo(() => {
    if (data) {
      try {
        return JSON.parse(data);
      } catch {
        return null;
      }
    }
  }, [data]);

  return (
    <Collapse
      isExpanded={isExpanded}
      setIsExpanded={setIsExpanded}
      header={<CollapseHeader title="SUMMARY.INFO" copyData={data} />}
    >
      {parsedData ? (
        <ReactJson
          src={parsedData}
          theme={theme.palette.mode === AppThemeVariant.dark ? 'grayscale' : 'grayscale:inverted'}
          style={{
            wordBreak: 'break-word',
            backgroundColor: 'transparent',
          }}
          collapseStringsAfterLength={30}
        />
      ) : (
        <Typography variant="body2" sx={{ overflowWrap: 'anywhere' }}>
          {data || NONE_VALUE}
        </Typography>
      )}
    </Collapse>
  );
};

export default InfoBlock;
