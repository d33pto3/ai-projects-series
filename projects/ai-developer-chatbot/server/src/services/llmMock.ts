export const generateMockResponse = async (messages: any[]) => {
  const lastMessage = messages[messages.length - 1]?.content || "";

  const responseText = `Mock response: I received your message: "${lastMessage}`;

  // Split response into "streaming chunks"
  const chunkSize = 5;
  const chunks = [];
  for (let i = 0; i < responseText.length; i += chunkSize) {
    chunks.push(responseText.slice(i, i + chunkSize));
  }

  return chunks;
};
