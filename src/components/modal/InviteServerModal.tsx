'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useModal } from '@/hooks/useModal';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Check, Copy, RefreshCw } from 'lucide-react';
import { useOrigin } from '@/hooks/useOrigin';
import { useState } from 'react';

const InviteServerModal = () => {
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const origin = useOrigin();

  const isMoadlOpen = isOpen && type === 'invite';

  const { server } = data;

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const copyHandler = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onCreateInviteCode = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/server/${server?.id}/invite`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json'
        }
      });

      const serverData = await response.json();

      onOpen('invite', { server: serverData });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isMoadlOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl">Ivite Peoples</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70">Server Invite link</Label>
          <div className="mt-2 flex items-center gap-x-2">
            <Input
              disabled={isLoading}
              readOnly
              value={inviteUrl}
              className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button onClick={copyHandler} size="icon">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <Button onClick={onCreateInviteCode} disabled={isLoading} variant="link" size="sm" className="mt-4 text-xs text-zinc-500">
            Generate a new link
            <RefreshCw className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteServerModal;
