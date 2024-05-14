import { styled } from '@mui/system';
import { Container } from "@mui/material"

export const FormContainerStyle = styled(Container)({
    width: '100%',

    '.inputs': {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridGap: '1.5rem 3rem',
        marginBottom: '1.5rem'
    }
}) 
