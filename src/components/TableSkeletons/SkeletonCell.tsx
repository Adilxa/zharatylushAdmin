import { Grid, Skeleton, TableCell } from '@mui/material';
import React from 'react';

const SkeletonCell: React.FC = () => (
  <TableCell>
    <Grid
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Skeleton
        variant="rectangular"
        height="22px"
        width="8%"
        sx={{ borderRadius: '5px' }}
      />
      <Skeleton
        variant="rectangular"
        height="22px"
        width="75%"
        sx={{ borderRadius: '5px' }}
      />
      <Skeleton
        variant="rectangular"
        height="22px"
        width="8%"
        sx={{ borderRadius: '5px' }}
      />
    </Grid>
  </TableCell>
);

export default SkeletonCell;
