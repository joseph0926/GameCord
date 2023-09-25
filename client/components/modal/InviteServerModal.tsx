'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useModalStore } from '@/hooks/useModalStore';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, Copy, RefreshCw } from 'lucide-react';
import { useOrigin } from '@/hooks/useOrigin';
import { useState } from 'react';
import { customAxios } from '@/lib/customAxios';

const InviteServerModal = () => {
  const { isOpen, onClose, type, data, onOpen } = useModalStore();
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
      const response = await customAxios.patch(`/server/${server?.id}/invite`);

      onOpen('invite', { server: response.data });
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
          <DialogTitle className="text-center text-2xl">Invite Server</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70">초대 코드</Label>
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
            초대 코드 재생성
            <RefreshCw className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteServerModal;
