import React from 'react';
import { Box, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const TourReport = ({ tourDetail, tourUserList }) => {

  if (tourUserList)
    return (

      <Box sx={{position:"absolute" , right:"1000%"}} id="report-section" p={2} width={760}>
        <Grid container spacing={2}>
          <Grid item xs={12} container justifyContent="space-between" alignItems="center">
            <Typography variant="h5">Zharatylysh admin</Typography>
            <div style={{ overflow: "hidden", color: "white" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto at tempora eius! Magni soluta tempore, laboriosam distinctio atque qui autem nisi odio beatae rerum consequatur excepturi id veritatis quasi illum suscipit reiciendis quas! Quos, sit tempora. Odio cupiditate sint perferendis?.
            </div>
            {/* <Box component="img" src="" alt="Company Logo" /> */}
          </Grid>
          <Grid item xs={12} container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1">Company Name: Zharatylysh Travel</Typography>
              <Typography variant="body1">Phone: +996500000000</Typography>
              <Typography variant="body1">Email Address: zharatylysh@company.com</Typography>
              <Typography variant="body1">Bishkek, Kyrgyzstan, Zip Code: 720004</Typography>
            </Grid>
          </Grid>
          <div style={{ overflow: "hidden", color: "white" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto at tempora eius! Magni soluta tempore, laboriosam distinctio atque qui autem nisi odio beatae rerum consequatur excepturi id veritatis quasi illum suscipit reiciendis quas! Quos, sit tempora. Odio cupiditate sint perferendis?.
          </div>

          <Grid item xs={12}>

            <Grid container>
              <Grid item xs={2}>
                <Typography variant="body1">Name of Tour: {tourDetail?.title}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1">Location: {tourDetail?.location}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1">Price: {tourDetail?.price}c</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1">Start Date: {tourDetail?.startDate}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1">End Date: {tourDetail?.endDate}</Typography>
              </Grid>

            </Grid>
          </Grid>
          <div style={{ overflow: "hidden", color: "white" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto at tempora eius! Magni soluta tempore, laboriosam distinctio atque qui autem nisi odio beatae rerum consequatur excepturi id veritatis quasi illum suscipit reiciendis quas! Quos, sit tempora. Odio cupiditate sint perferendis?.
          </div>

          <Grid item xs={12}>
            <TableContainer >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Пользователь</TableCell>
                    <TableCell>Страна</TableCell>
                    <TableCell>Карта</TableCell>
                    <TableCell>Сколько купил</TableCell>
                    <TableCell>На какую сумму</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tourUserList.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell>{user?.user.email}</TableCell>
                      <TableCell>{user?.user.country}</TableCell>
                      <TableCell>{user?.user.cardNumber}</TableCell>
                      <TableCell>{user?.amount}</TableCell>
                      <TableCell>{user?.sum}сом</TableCell>
                      {/* <TableCell>{user.miscExpenses}</TableCell>
                    <TableCell>{user.dailyTotals}</TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* <Grid item xs={12} container justifyContent="space-between">
          <Typography variant="body1">Total Travel Expenses:</Typography>
          <Typography variant="body1">Total Owed to Employee:</Typography>
        </Grid> */}
        
          <Grid item xs={12} container justifyContent="space-between">
            <Typography variant="body1">Income(com): {tourUserList?.reduce((acc, el) => acc + el.sum, 0)}</Typography>
            {/* <Typography variant="body1">Income(com): {tourUserList.reduce((acc, el) => acc + el.sum, 0) - 100}</Typography> */}
          </Grid>
          <div style={{ overflow: "hidden", color: "white" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto at tempora eius! Magni soluta tempore, laboriosam distinctio atque qui autem nisi odio beatae rerum consequatur excepturi id veritatis quasi illum suscipit reiciendis quas! Quos, sit tempora. Odio cupiditate sint perferendis?.
          </div>
          <Grid item xs={12} container justifyContent="space-between">
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <Typography variant="body1">Gid Segnature:</Typography>
              <hr style={{ width: "100px", height: "1px" }} />
            </div>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <Typography variant="body1">Admin Approval:</Typography>
              <hr style={{ width: "100px", height: "1px" }} />
            </div>
          </Grid>
        </Grid>
      </Box>
    );
  else {
    return (
      <div></div>
    )
  }
};

export default TourReport;
