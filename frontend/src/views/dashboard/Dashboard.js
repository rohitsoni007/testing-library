import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

export default function Dashboard() {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* Recent Deposits */}
                {/* <Grid item xs={12} md={4} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            height: 240,
                        }}
                    >
                        <Deposits />
                    </Paper>
                </Grid> */}
                {/* Recent Orders */}
                
            </Grid>
            {/* <Copyright sx={{ pt: 4 }} /> */}
        </Container>
    );
}
