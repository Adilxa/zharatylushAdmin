import React from 'react';
import {
  Skeleton,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import SkeletonCell from './SkeletonCell';

const TableSkeletons: React.FC = () => (
  <>
    <TableHead sx={(theme) => ({ background: theme.palette.grey[100] })}>
      <TableRow>
        <TableCell>
          <Skeleton
            variant="rectangular"
            height={30}
            sx={{
              borderRadius: '5px',
              marginBottom: '2px',
            }}
          />
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <SkeletonCell />
      </TableRow>
      <TableRow>
        <SkeletonCell />
      </TableRow>
      <TableRow>
        <SkeletonCell />
      </TableRow>
      <TableRow>
        <SkeletonCell />
      </TableRow>
    </TableBody>
  </>
);

export default TableSkeletons;
