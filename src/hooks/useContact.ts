
import { useMutation } from '@tanstack/react-query';
import { messageService } from '@/services/strapi';
import { useToast } from '@/hooks/use-toast';

export const useSendMessage = () => {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: messageService.sendMessage,
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon!",
      });
    },
    onError: (error) => {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });
};
