import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';

type ChipSkeletonProps = {
  chipsAmount: number;
};

const ChipSkeleton = ({ chipsAmount }: ChipSkeletonProps) => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '4fr 1fr 1fr' }}>
      {Array(chipsAmount)
        .fill(0)
        .map((_, i) => (
          <Skeleton key={i}>
            <Chip />
          </Skeleton>
        ))}
    </Box>
  );
};
export default ChipSkeleton;
