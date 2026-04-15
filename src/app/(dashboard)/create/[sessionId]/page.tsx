import { ChatContainer } from "@/components/chat/chat-container";

interface CreateSessionPageProps {
  params: { sessionId: string };
}

export default function CreateSessionPage({ params }: CreateSessionPageProps): React.JSX.Element {
  return (
    <div className="h-full">
      <ChatContainer
        sessionId={params.sessionId}
        mode="guided"
        role="product-owner"
        artifactType="user-story-feature"
      />
    </div>
  );
}
