"use client";
import ChatItem from "@/components/chat-item/chat-item";
import ChatRoom from "@/components/chat-room/chat-room";
import Layout from "@/components/layout/layout";
import app from "@/firebase/config";
import { useAuth } from "@/hooks/auth-context";
import { Add, Send } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  child,
  getDatabase,
  onValue,
  push,
  ref,
  set,
  update,
} from "firebase/database";
import {
  Timestamp,
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { FormEvent, useEffect, useRef, useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<Record<string, string>[]>([]);
  const { user } = useAuth();
  const [formValue, setFormValue] = useState({
    user: user?.email || "",
    message: "",
  });
  const [newContact, setNewContact] = useState("");
  const [chats, setChats] = useState<any[]>([]);
  const database = getDatabase();

  const [usersData, setUsersData] = useState({
    contacts: {},
    email: "",
    groups: {},
    name: "",
  });

  const [selectedChats, setSelectedChats] = useState<string>("");

  useEffect(() => {
    getUserData();
    return () => getUserData();
  }, [user]);

  const getUserData = () => {
    const usersRef = ref(database, "users/" + user?.uid);
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      console.log("users data", data);
      let usersChats = [];
      for (let key in data.chats) {
        usersChats.push({ id: key });
      }

      setChats(usersChats);

      setUsersData(data);
    });
  };

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const messageRef = ref(database, "message/" + selectedChats);
    const newMessageRefKey = push(messageRef).key;

    const newData = {
      timestamp: Timestamp.now().seconds,
      message: formValue.message,
      sender: user?.uid || "",
      senderName: user?.displayName || "",
    };

    const updates: any = {};
    updates[`/chats/${selectedChats}/latestMessage`] = {
      value: formValue.message,
    };
    updates[`/messages/${selectedChats}/${newMessageRefKey}`] = newData;

    update(ref(database), updates);
    setFormValue({ ...formValue, message: "" });
  };

  const addContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const database = getDatabase();
    const newChatKey = push(child(ref(database), "chats")).key;

    const updates: any = {};
    //update this user
    updates[`/users/${user?.uid}/contacts/${newContact}`] = {
      chat: newChatKey,
    };
    updates[`/users/${user?.uid}/chats/${newChatKey}`] = true;

    //update target user
    updates[`/users/${newContact}/contacts/${user?.uid}`] = {
      chat: newChatKey,
    };
    updates[`/users/${newContact}/chats/${newChatKey}`] = true;

    //create chat room
    updates[`/chats/${newChatKey}`] = {
      name: `Chat with ${newContact}`,
      startedAt: Timestamp.now().seconds,
      latestMessage: {
        value: "",
      },
    };

    update(ref(database), updates);
  };

  const handleSelectChat = (chat: any) => {
    setSelectedChats(chat.id);
  };

  return (
    <main>
      <Layout>
        <Box>
          <Grid container padding={2}>
            <Grid item xs={12} md={6}>
              <Box
                component={"form"}
                onSubmit={addContact}
                display={"flex"}
                gap={1}
              >
                <TextField
                  fullWidth
                  label="User ID"
                  variant="outlined"
                  value={newContact}
                  onChange={(event) => setNewContact(event.target.value)}
                ></TextField>
                <IconButton type="submit">
                  <Add />
                </IconButton>
              </Box>

              <Typography variant="h5" marginTop={2}>
                Chats
              </Typography>

              <Stack gap={1} marginTop={2} padding={1}>
                {chats.map((chat) => {
                  console.log("chat", chat);
                  return (
                    <ChatItem
                      id={chat.id}
                      key={chat.id}
                      onSelectChat={() => handleSelectChat(chat)}
                    />
                  );
                })}
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              {selectedChats && <ChatRoom chatID={selectedChats} />}
            </Grid>
          </Grid>

          {selectedChats && (
            <Box component={"form"} onSubmit={sendMessage} padding={2}>
              <Stack flexDirection={"row"} gap={1}>
                <TextField
                  fullWidth
                  label="Message"
                  variant="outlined"
                  name="message"
                  value={formValue.message}
                  onChange={(event) =>
                    setFormValue({ ...formValue, message: event.target.value })
                  }
                ></TextField>
                <IconButton type="submit">
                  <Send />
                </IconButton>
              </Stack>
            </Box>
          )}
        </Box>
      </Layout>
    </main>
  );
}
