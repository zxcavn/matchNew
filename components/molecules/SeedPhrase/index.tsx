import { Typography } from '@mui/material';
import { useId } from 'react';

import { Copy } from '@/lib/xfi.lib/components/atoms';

import { PhrasePartContainer, SeedPhraseTable, StyledBlock, StyledSeedPhraseContainer } from './styles';

type PhrasePartProps = {
  count: number;
  word: string;
};

const PhrasePart = ({ count, word }: PhrasePartProps) => {
  return (
    <PhrasePartContainer>
      <Typography color="neutrals.secondaryText" component="span" variant="body1">
        {count}
      </Typography>
      <Typography color="background.light" component="span" variant="body1">
        {word}
      </Typography>
    </PhrasePartContainer>
  );
};

interface SeedPhraseProps {
  mnemonic: string;
  className?: string;
}

const SeedPhrase = ({ mnemonic, className }: SeedPhraseProps) => {
  const key = useId();

  return (
    <StyledBlock>
      <StyledSeedPhraseContainer className={className}>
        <SeedPhraseTable>
          {mnemonic.split(' ').map((word, index) => (
            <PhrasePart key={key + index} word={word} count={index + 1} />
          ))}
        </SeedPhraseTable>
        <Copy variant="button" value={mnemonic} />
      </StyledSeedPhraseContainer>
    </StyledBlock>
  );
};

export default SeedPhrase;
