import { useAuth } from "@/hooks/auth-context";
import { Box, Card, Stack, Typography } from "@mui/material";
import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

interface ChatRoom {
  chatID: string;
}

export default function ChatRoom({ chatID }: ChatRoom) {
  const { user } = useAuth();
  const [chats, setChats] = useState<any[]>([]);

  useEffect(() => {
    getChats();
    return () => getChats();
  }, [chatID]);

  const getChats = () => {
    const database = getDatabase();
    const usersRef = ref(database, "messages/" + chatID);
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      console.log("messages data", data);
      let temp: any[] = [];
      for (let key in data) {
        temp.push({ ...data[key], id: key });
      }
      setChats(temp);
      console.log("temp", temp);
    });
  };

  return (
    <Box
      sx={{
        minHeight: "500px",
        padding: 2,
        border: "1px solid",
        borderColor: "primary.main",
      }}
      borderRadius={1}
      display={"flex"}
      justifyContent={"flex-end"}
      flexDirection={"column"}
    >
      <Stack gap={1} justifyContent={"flex-end"}>
        {chats.map((item) => {
          const isSelf = item.sender === user?.uid;
          return (
            <Card
              key={item.id}
              sx={{
                width: "fit-content",
                padding: 1.5,
                marginLeft: isSelf ? "auto" : "0",
                bgcolor: isSelf ? "info.main" : "unset",
                color: isSelf ? "white" : "unset",
              }}
            >
              <Typography variant="body2">{item.message}</Typography>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
}
