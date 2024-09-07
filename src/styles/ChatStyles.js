import { styled } from '@mui/material/styles';
import { Container, Typography, TextField, Button, Paper, List, ListItem } from '@mui/material';
import dragonscales from '../assets/dragonscales.png'

export const ChatContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'space-between',
    backgroundImage: `url(${dragonscales})`,
    backgroundSize: 'center',
    backgroundPosition: 'center',
    padding: theme.spacing(2),
}));

export const MessageList = styled(Paper)(({ theme }) => ({
    overflowY: 'auto',
    flex: 1,
    padding: theme.spacing(2),
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    height: '50vh',
    width: '80%',
    maxHeight: '400px',
    margin: 'auto',
}));

export const MessageItem = styled(ListItem)(({ theme, owner }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: owner === 'own' ? 'flex-end' : 'flex-start',
    marginBottom: theme.spacing(2),
    width: '100%',
}));

export const MessageHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(0.5),
}));

export const Username = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    marginRight: theme.spacing(1),
    fontFamily: 'Courier New, monospace',
}));

export const Timestamp = styled(Typography)(({ theme }) => ({
    fontSize: '0.6em',
    color: 'gray',
    marginRight: theme.spacing(1),
    fontFamily: 'Courier New, monospace',
}));

export const MessageContent = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(0.5),
    textAlign: 'left',
    backgroundColor: 'white',
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    fontFamily: 'Arial, sans-serif',
}));

export const InputContainer = styled('form')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    width: '80%',
    margin: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    fontFamily: 'Arial, sans-serif',
}));

export const Input = styled(TextField)(({ theme }) => ({
    flex: 1,
    marginRight: theme.spacing(1),
    backgroundColor: 'white',
    '& .MuiInputBase-input': {
        color: 'black',
        fontFamily: 'Arial, sans-serif',
    },    
}));

export const SendButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'white',
    color: 'black',
    '&:hover': {
        backgroundColor: 'lightgray',
    },
    fontFamily: 'Arial, sans-serif',
}));

