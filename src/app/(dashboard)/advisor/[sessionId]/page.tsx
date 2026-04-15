import { ChatContainer } from "@/components/chat/chat-container";

interface AdvisorSessionPageProps {
  params: { sessionId: string };
}

export default function AdvisorSessionPage({ params }: AdvisorSessionPageProps): React.JSX.Element {
  return (
    <div className="h-full">
      <ChatContainer
        sessionId={params.sessionId}
        mode="advisory"
        role="product-owner"
      />
    </div>
  );
}
