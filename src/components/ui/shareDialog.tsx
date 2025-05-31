'use client';

import * as Dialog from '@radix-ui/react-dialog';
import {
  Facebook,
  Twitter,
  Linkedin,
  MessageCircleMore as Whatsapp,
  Share2,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ShareDialog() {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    {
      name: 'Twitter',
      icon: <Twitter className="h-5 w-5" />,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'Facebook',
      icon: <Facebook className="h-5 w-5" />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'WhatsApp',
      icon: <Whatsapp className="h-5 w-5" />,
      href: `https://wa.me/?text=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="h-5 w-5" />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
  ];

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div className="flex select-none gap-3 px-3 py-1 border dark:border-gray-800 border-gray-200 items-center justify-center hover:bg-gray-100 dark:hover:bg-muted transition cursor-pointer rounded-full">
          <Share2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-gray-500 dark:text-gray-400 font-semibold text-sm">Share</span>
        </div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 max-w-md w-full bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-xl transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="space-y-1.5">
            <Dialog.Title className="text-xl font-semibold text-foreground">Share this tool</Dialog.Title>
            <Dialog.Description className="text-muted-foreground">Copy the link or share it directly</Dialog.Description>
          </div>

          <div className="inline-flex gap-4 my-6">
            {socialLinks.map(({ name, icon, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={`Share on ${name}`}
                aria-label={`Share on ${name}`}
                className="group bg-muted hover:bg-primary text-muted-foreground hover:text-white transition-colors p-5 rounded-full shadow-md"
              >
                <div className="flex items-center justify-center">
                  {icon}
                </div>
              </a>
            ))}
          </div>

          <div className="flex items-center justify-between gap-2 border px-3 py-2 rounded-md bg-gray-200 dark:bg-neutral-800">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 bg-transparent text-md py-2 px-2 text-foreground outline-none"
            />
            <button
              onClick={handleCopy}
              className="text-primary text-sm font-medium transition"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
