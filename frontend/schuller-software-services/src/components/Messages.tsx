import {
  Box,
  Button,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../containers/AuthProvider';

interface Message {
  uuid: string;
  owner: string;
  message: string;
  dateTime: string;
}

function Messages() {
  const auth = useContext(AuthContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);

  const authHeader = { Authorization: 'Bearer ' + auth.authentication.credential };

  const fetchMessages = () => {
    setLoading(true);
    fetch(process.env.REACT_APP_API_HOST + '/messages/all', { headers: authHeader })
      .then((res) => res.json())
      .then((data) => {
        setMessages(data.messages ?? []);
        setNextCursor(data.nextCursor ?? null);
      })
      .finally(() => setLoading(false));
  };

  const loadMore = () => {
    if (!nextCursor) return;
    setLoadingMore(true);
    fetch(`${process.env.REACT_APP_API_HOST}/messages/all?cursor=${nextCursor}`, {
      headers: authHeader,
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages((prev) => [...prev, ...(data.messages ?? [])]);
        setNextCursor(data.nextCursor ?? null);
      })
      .finally(() => setLoadingMore(false));
  };

  useEffect(() => {
    if (auth.authenticated) fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.authenticated]);

  const postMessage = () => {
    if (!newMessage.trim()) return;
    fetch(process.env.REACT_APP_API_HOST + '/messages/post', {
      method: 'POST',
      headers: { ...authHeader, 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: newMessage }),
    }).then(() => {
      setNewMessage('');
      fetchMessages();
    });
  };

  if (!auth.authenticated) {
    return (
      <Typography sx={{ color: 'rgba(255,255,255,0.6)', p: 2 }}>
        Please log in to use messages.
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && postMessage()}
          sx={{ input: { color: 'white' } }}
        />
        <Button variant="contained" onClick={postMessage} disabled={!newMessage.trim()}>
          Send
        </Button>
      </Box>

      {loading ? (
        <CircularProgress size={24} />
      ) : (
        <>
          <List dense disablePadding>
            {messages.map((msg, i) => (
              <Box key={msg.uuid}>
                <ListItem disableGutters>
                  <ListItemText
                    primary={msg.message}
                    secondary={`${msg.owner} · ${new Date(msg.dateTime).toLocaleString()}`}
                  />
                </ListItem>
                {i < messages.length - 1 && <Divider />}
              </Box>
            ))}
            {messages.length === 0 && (
              <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
                No messages yet.
              </Typography>
            )}
          </List>

          {nextCursor && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button variant="outlined" onClick={loadMore} disabled={loadingMore}>
                {loadingMore ? <CircularProgress size={20} /> : 'Load more'}
              </Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

export default Messages;
