import { Stack, styled, Typography } from '@mui/material';
import { format } from 'date-fns';

export const TEST_ID = 'datetime-test-id';

export type Props = {
  date: string;
  dateFormat?: string;
  timeFormat?: string;
  className?: string;
};

/**
 * A component that displays formatted date and time.
 *
 * The `DateTime` component takes a date string and formats it into the specified date and time formats.
 * It renders the formatted date and time in a styled container.
 *
 * @component
 *
 * @param {object} props - The props for the component.
 * @param {string} props.date - The date string to be formatted.
 * @param {string} [props.dateFormat='MMMM dd, yyyy'] - The format for displaying the date.
 * @param {string} [props.timeFormat='HH:mm:ss'] - The format for displaying the time.
 * @param {string} [props.className] - Additional class name for styling.
 *
 * @returns {FC} The `DateTime` component, which displays formatted date and time.
 */
const DateTime = ({ date, dateFormat = 'MMMM dd, yyyy', timeFormat = 'HH:mm:ss', className }: Props) => {
  const formattedDate = format(new Date(date), dateFormat);
  const formattedTime = format(new Date(date), timeFormat);

  return (
    <StyledContainer direction="column" className={className} data-testid={TEST_ID}>
      <Typography className="date" variant="body1" color="background.light">
        {formattedDate}
      </Typography>
      <Typography className="time" variant="body1" color="neutrals.secondaryText">
        {formattedTime}
      </Typography>
    </StyledContainer>
  );
};

const StyledContainer = styled(Stack, { name: 'StyledContainer' })(({ theme }) => ({
  whiteSpace: 'nowrap',

  [theme.breakpoints.down('md')]: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '0.25rem',
    textWrap: 'initial',
  },
}));

export default DateTime;
