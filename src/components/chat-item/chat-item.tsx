import { Button, Stack, Typography } from "@mui/material";
import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

interface ChatItemProp {
  id: string;
  onSelectChat: () => void;
}

export default function ChatItem({ id, onSelectChat }: ChatItemProp) {
  const database = getDatabase();
  const [chatDetails, setChatDetails] = useState({
    latestMessage: { value: "" },
    name: "",
    startedAt: "",
  });

  useEffect(() => {
    listenToChatDetails();
    return () => listenToChatDetails();
  }, []);

  const listenToChatDetails = () => {
    const chatRef = ref(database, "chats/" + id);
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      setChatDetails(data);
    });
  };

  return (
    <Button
      onClick={onSelectChat}
      sx={{ textAlign: "left", justifyContent: "left" }}
    >
      <Stack>
        <Typography>{chatDetails.name}</Typography>
        <Typography variant="body2">
          {chatDetails.latestMessage.value}
        </Typography>
      </Stack>
    </Button>
  );
}
