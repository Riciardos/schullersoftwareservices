import { Button, CircularProgress, Divider, List, ListItem, ListItemText } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../containers/AuthProvider';
import {
  EmptyMessage,
  InputRow,
  LoadMoreContainer,
  LoginPrompt,
  MessagesContainer,
  StyledTextField,
} from './Messages.styles';

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
    return <LoginPrompt>Please log in to use messages.</LoginPrompt>;
  }

  return (
    <>
          <InputRow>
        <StyledTextField
          fullWidth
          size="small"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && postMessage()}
        />
        <Button variant="contained" onClick={postMessage} disabled={!newMessage.trim()}>
          Send
        </Button>
      </InputRow>
    <MessagesContainer>


      {loading ? (
        <CircularProgress size={24} />
      ) : (
        <>
          <List dense disablePadding>
            {messages.map((msg, i) => (
              <div key={msg.uuid}>
                <ListItem disableGutters>
                  <ListItemText
                    primary={msg.message}
                    secondary={`${msg.owner} · ${new Date(msg.dateTime + 'Z').toLocaleString()}`}
                  />
                </ListItem>
                {i < messages.length - 1 && <Divider />}
              </div>
            ))}
            {messages.length === 0 && <EmptyMessage>No messages yet.</EmptyMessage>}
          </List>

          {nextCursor && (
            <LoadMoreContainer>
              <Button variant="outlined" onClick={loadMore} disabled={loadingMore}>
                {loadingMore ? <CircularProgress size={20} /> : 'Load more'}
              </Button>
            </LoadMoreContainer>
          )}
        </>
      )}
    </MessagesContainer>
    </>
  );
}

export default Messages;
