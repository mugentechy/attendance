import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const FeatureCard = ({ icon: Icon, title }) => (
  <Card sx={{  width: '100%',justifyContent: 'center', alignItems: 'center', p: 2 }}>
    <CardMedia
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Icon sx={{ fontSize: 48 }} />
    </CardMedia>
    <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
      <Typography variant="h5">
        {title}
      </Typography>
    </CardContent>
  </Card>
);

export default FeatureCard;
