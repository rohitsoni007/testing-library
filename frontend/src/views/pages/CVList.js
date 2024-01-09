import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Box, Button, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from "react";
import { deleteResume, getAllResume } from "../../utils/service";



export default function CVList() {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState({
        rows:[],
        count: 0
    });
  const navigate = useNavigate();


    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
      });
    
    const getAll = useCallback( () => {

        const getAllResumes = async() => {
            let resp = await getAllResume(paginationModel.pageSize, paginationModel.page);
            if(resp){
                setData(resp?.data?.data)
            }
        }
        getAllResumes();
    },[paginationModel])
    
     
      useEffect(() => {
        getAll()
      }, [paginationModel, getAll])
      
    
      const onEdit = (params) => {
        navigate('/cv-page/'+params.id);
        
      }
    
      const onDelete = async(params) => {
        await deleteResume(params?.row?._id);
        getAll()
      }
    
      const columns = [
        { field: '_id', headerName: 'ID', width: 220, },
        {
          field: 'name',
          headerName: 'Name',
          width: 150,
          editable: false,
        },
        {
          field: 'email',
          headerName: 'Email',
          width: 150,
          editable: false,
        },
        {
          field: 'phone',
          headerName: 'Phone',
          type: 'number',
          width: 150,
          editable: true,
        },
        {
          field: 'action',
          headerName: 'Action',
          description: 'Action',
          sortable: false,
          width: 160,
          renderCell: (params) => {
          return <>
            <Button variant="text" name="edit" onClick={e=> onEdit(params)}><EditIcon/></Button>
            <Button variant="text" name="delete" onClick={e=> onDelete(params)}><DeleteIcon style={{color:'red'}}/></Button>
            
          </>
    
          }
    
        },
      ];
    
    
      useEffect(() => {
        setLoading(false);
      }, []);
    
      const handleClickAdd = () => {
        navigate('/cv-page');
    
      }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper
                        sx={{ p: 2, display: "flex", flexDirection: "column" }}
                    >
                        <Box sx={{ margin: 2, flex: 1 }}>
                            <Button
                                onClick={handleClickAdd}
                                style={{ marginLeft: "auto" }}
                                variant="contained"
                                type="primary"
                            >
                                <AddIcon />
                                Add CV
                            </Button>
                        </Box>
                        <Box sx={{ height: 400, width: "100%" }}>
                            <DataGrid
                                getRowId={(row) => row._id}
                                rows={data?.rows || []}
                                columns={columns}
                                rowCount={data?.count || 0}
                                loading={isLoading}
                                pageSizeOptions={[5]}
                                paginationModel={paginationModel}
                                paginationMode="server"
                                onPaginationModelChange={setPaginationModel}
                                disableRowSelectionOnClick
                            />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
