import { Box, styled } from '@mui/material';

import { HASH_CHECK_CUSTOM_BREAKPOINTS } from '@/shared/constants';

const ROTATION_STYLES = {
  img: {
    transform: 'rotateY(180deg)',
  },
  '& >svg:first-of-type': {
    transform: 'rotateY(180deg)',
  },
};

const NONE_ROTATION_STYLES = {
  img: {
    transform: 'rotateY(0)',
  },
  '& >svg:first-of-type': {
    transform: 'rotateY(0)',
  },
};

export const StyledHashCheckWidget = styled(Box, { name: 'StyledHashCheckWidget' })(({ theme }) => ({
  position: 'relative',
  margin: '0 0 4.625rem',
  overflow: 'visible',

  [theme.breakpoints.down(HASH_CHECK_CUSTOM_BREAKPOINTS.md)]: {
    margin: '0 -0.25rem 3.75rem',
  },

  '& .formButtons': {
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column-reverse',
    },
  },

  '.topShadowAreaIcon': {
    position: 'absolute',
    top: '-12.5rem',
    left: '30%',
    width: '44.3462rem',
    height: '50.4338rem',
    transform: 'rotate(-115.28deg) translateY(-30%)',
  },

  '.bottomShadowAreaIcon': {
    position: 'absolute',
    bottom: '18.75rem',
    left: '40%',
    width: '44.3462rem',
    height: '50.4338rem',
    transform: 'rotate(-115.28deg) translate(-50%, -50%)',
  },

  '.stepsContainer': {
    display: 'grid',
    width: 'max-content',
    margin: '0 auto',
    gridTemplateColumns: 'repeat(16, min-content)',
    gridTemplateAreas: `
    "First First First First Second Second Second Second Third Third Third Third Fourth Fourth Fourth Fourth"
    "Seventh Seventh Seventh Seventh Seventh Seventh Sixth Sixth Sixth Sixth Fifth Fifth Fifth Fifth Fifth Fifth"
    "Eighth Eighth Eighth Eighth Eighth Eighth Eighth Eighth Nineth Nineth Nineth Nineth Nineth Nineth Nineth Nineth"
    `,
    marginTop: '1.5rem',

    [theme.breakpoints.down(HASH_CHECK_CUSTOM_BREAKPOINTS.xl)]: {
      gridTemplateAreas: `
        "First Second Third"
        "Sixth Fifth Fourth"
        "Seventh Eighth Nineth"
        `,
    },

    [theme.breakpoints.down(HASH_CHECK_CUSTOM_BREAKPOINTS.lg)]: {
      gridTemplateAreas: `
          "First Second"
          "Fourth Third"
          "Fifth Sixth"
          "Eighth Seventh"
          "Nineth Nineth"
          `,
    },

    [theme.breakpoints.down(HASH_CHECK_CUSTOM_BREAKPOINTS.md)]: {
      gridTemplateAreas: `
            "First"
            "Second"
            "Third "
            "Fourth"
            "Fifth"
            "Sixth"
            "Seventh"
            "Eighth"
            "Nineth"
            `,
    },
  },

  '.step-1': {
    gridArea: 'First',
  },

  '.step-2': {
    gridArea: 'Second',
    [theme.breakpoints.down(HASH_CHECK_CUSTOM_BREAKPOINTS.md)]: ROTATION_STYLES,
  },

  '.step-3': {
    gridArea: 'Third',
    [theme.breakpoints.down(HASH_CHECK_CUSTOM_BREAKPOINTS.lg)]: ROTATION_STYLES,
    [theme.breakpoints.down(HASH_CHECK_CUSTOM_BREAKPOINTS.md)]: NONE_ROTATION_STYLES,
  },

  '.step-4': {
    gridArea: 'Fourth',
    [theme.breakpoints.down(HASH_CHECK_CUSTOM_BREAKPOINTS.xl)]: ROTATION_STYLES,
  },

  '.step-5': {
    gridArea: 'Fifth',
    ...ROTATION_STYLES,
    [theme.breakpoints.down(HASH_CHECK_CUSTOM_BREAKPOINTS.lg)]: NONE_ROTATION_STYLES,
  },

  '.step-6': {
    gridArea: 'Sixth',
    ...ROTATION_STYLES,
    [theme.breakpoints.down(HASH_CHECK_CUSTOM_BREAKPOINTS.lg)]: NONE_ROTATION_STYLES,
    [theme.breakpoints.down(HASH_CHECK_CUSTOM_BREAKPOINTS.md)]: ROTATION_STYLES,
  },

  '.step-7': {
    gridArea: 'Seventh',
    alignItems: 'end',
    ...ROTATION_STYLES,
    [theme.breakpoints.down(HASH_CHECK_CUSTOM_BREAKPOINTS.xl)]: NONE_ROTATION_STYLES,
    [theme.breakpoints.down(HASH_CHECK_CUSTOM_BREAKPOINTS.lg)]: ROTATION_STYLES,
    [theme.breakpoints.down(HASH_CHECK_CUSTOM_BREAKPOINTS.md)]: NONE_ROTATION_STYLES,
  },

  '.step-8': {
    gridArea: 'Eighth',
    alignItems: 'end',
    [theme.breakpoints.down(HASH_CHECK_CUSTOM_BREAKPOINTS.lg)]: ROTATION_STYLES,
  },

  '.step-9': {
    gridArea: 'Nineth',

    [theme.breakpoints.down(HASH_CHECK_CUSTOM_BREAKPOINTS.lg)]: {
      alignItems: 'center',
    },
  },
}));
