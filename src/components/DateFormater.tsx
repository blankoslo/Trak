import Typography, { TypographyProps } from '@mui/material/Typography';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { prismaDateToFormatedDate } from 'utils/utils';

export type DateFormaterProps = TypographyProps & {
  date: string;
};

const DateFormater = ({ variant = 'body1', date, ...args }: DateFormaterProps) => {
  const daysBeforeDueDate = differenceInCalendarDays(new Date(date), new Date());
  return (
    <Typography variant={variant} {...args}>
      {daysBeforeDueDate === 0 && 'I dag'}
      {daysBeforeDueDate === 1 && 'I morgen'}
      {daysBeforeDueDate > 1 && daysBeforeDueDate <= 7 && `Om ${daysBeforeDueDate} dager`}
      {(daysBeforeDueDate > 7 || daysBeforeDueDate < 0) && prismaDateToFormatedDate(date)}
    </Typography>
  );
};

export default DateFormater;
