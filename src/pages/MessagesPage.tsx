import { Mail } from "lucide-react";

const MessagesPage = () => {
  return (
    <div className="min-h-screen bg-background safe-bottom">
      <div className="gradient-primary px-4 py-5">
        <h1 className="text-xl font-bold text-primary-foreground">Messages</h1>
      </div>
      <div className="flex flex-col items-center justify-center px-4 pt-20">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
          <Mail className="h-8 w-8 text-primary" />
        </div>
        <p className="mt-4 text-center text-lg font-semibold text-foreground">
          No messages yet
        </p>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Messages from your practitioners will appear here
        </p>
      </div>
    </div>
  );
};

export default MessagesPage;
