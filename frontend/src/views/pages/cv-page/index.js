import { Grid  } from '@mui/material';

import CVForm from './cv-form';
import { useRef } from 'react';


const CVPage = () => {
  const componentRef = useRef();

  return(

  
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={0.5}>
            <Grid item xs={6} md={6}>
              
                <CVForm ref={componentRef}/>
            </Grid>
            
        </Grid>
      </Grid>
      </Grid>
  )
            };

export default CVPage;
