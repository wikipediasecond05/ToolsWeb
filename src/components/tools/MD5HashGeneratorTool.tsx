
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Copy, Trash2, Hash, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Standard MD5 JavaScript implementation (derived from common public domain sources)
function md5(str: string): string {
  function safe_add(x: number, y: number): number {
    const lsw = (x & 0xffff) + (y & 0xffff);
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  }

  function bit_rol(num: number, cnt: number): number {
    return (num << cnt) | (num >>> (32 - cnt));
  }

  function md5_cmn(q: number, a: number, b: number, x: number, s: number, t: number): number {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
  }

  function md5_ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5_cmn((b & c) | (~b & d), a, b, x, s, t);
  }

  function md5_gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5_cmn((b & d) | (c & ~d), a, b, x, s, t);
  }

  function md5_hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t);
  }

  function md5_ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
  }

  function core_md5(x: number[], len: number): number[] {
    x[len >> 5] |= 0x80 << len % 32;
    x[(((len + 64) >>> 9) << 4) + 14] = len;

    let a = 1732584193;
    let b = -271733879;
    let c = -1732584194;
    let d = 271733878;

    for (let i = 0; i < x.length; i += 16) {
      const olda = a;
      const oldb = b;
      const oldc = c;
      const oldd = d;

      a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
      d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
      b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

      a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
      a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

      a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
      d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
      c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = md5_hh(b, c, d, a, x[i + 2], 23, -995338652);

      a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
      d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

      a = safe_add(a, olda);
      b = safe_add(b, oldb);
      c = safe_add(c, oldc);
      d = safe_add(d, oldd);
    }
    return [a, b, c, d];
  }

  function str2binl(str: string): number[] {
    const bin: number[] = [];
    const mask = (1 << 8) - 1;
    for (let i = 0; i < str.length * 8; i += 8) bin[i >> 5] |= (str.charCodeAt(i / 8) & mask) << i % 32;
    return bin;
  }

  function binl2hex(binarray: number[]): string {
    const hex_tab = '0123456789abcdef';
    let str = '';
    for (let i = 0; i < binarray.length * 4; i++) {
      str +=
        hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xf) +
        hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xf);
    }
    return str;
  }

  function Utf8Encode(string: string): string {
    string = string.replace(/\r\n/g, '\n');
    let utftext = '';
    for (let n = 0; n < string.length; n++) {
      const charcode = string.charCodeAt(n);
      if (charcode < 128) {
        utftext += String.fromCharCode(charcode);
      } else if (charcode > 127 && charcode < 2048) {
        utftext += String.fromCharCode((charcode >> 6) | 192);
        utftext += String.fromCharCode((charcode & 63) | 128);
      } else {
        utftext += String.fromCharCode((charcode >> 12) | 224);
        utftext += String.fromCharCode(((charcode >> 6) & 63) | 128);
        utftext += String.fromCharCode((charcode & 63) | 128);
      }
    }
    return utftext;
  }

  return binl2hex(core_md5(str2binl(Utf8Encode(str)), str.length * 8));
}


export function MD5HashGeneratorTool() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateHash = () => {
    if (!inputText.trim()) {
      setError('Please enter some text to hash.');
      setOutputText('');
      return;
    }
    setError(null);
    try {
      const hash = md5(inputText);
      setOutputText(hash);
    } catch (e) {
      console.error('Error generating MD5 hash:', e);
      setError('Failed to generate MD5 hash.');
      toast({
        title: 'Error',
        description: 'Failed to generate MD5 hash.',
        variant: 'destructive',
      });
    }
  };

  const handleClearText = () => {
    setInputText('');
    setOutputText('');
    setError(null);
  };

  const handleCopyToClipboard = async () => {
    if (!outputText) {
      toast({
        title: 'Nothing to copy',
        description: 'Generate an MD5 hash first.',
        variant: 'destructive',
      });
      return;
    }
    try {
      await navigator.clipboard.writeText(outputText);
      toast({
        title: 'MD5 Hash Copied!',
        description: 'MD5 hash copied to clipboard.',
      });
    } catch (err) {
      console.error('Failed to copy MD5 hash: ', err);
      toast({
        title: 'Copy Failed',
        description: 'Could not copy MD5 hash to clipboard.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">MD5 Hash Generator</CardTitle>
        <CardDescription className="text-lg">
          Generate MD5 hashes from your text input.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-2">
          <Label htmlFor="inputText-md5" className="font-semibold mb-4 block">Input Text</Label>
          <Textarea
            id="inputText-md5"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to hash..."
            rows={6}
            className="font-mono border-border focus-visible:ring-primary"
            aria-label="Input text for MD5 hashing"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button onClick={handleGenerateHash} className="w-full sm:w-auto">
            <Hash className="mr-2 h-4 w-4" />
            Generate MD5 Hash
          </Button>
          <Button variant="outline" onClick={handleClearText} className="w-full sm:w-auto">
            <Trash2 className="mr-2 h-4 w-4" /> Clear
          </Button>
        </div>

        {outputText && (
          <div className="grid gap-2 pt-6 border-t border-border">
            <div className="flex justify-between items-center">
              <Label htmlFor="outputText-md5" className="font-semibold mb-4 block">
                MD5 Hash Output:
              </Label>
              <Button variant="ghost" size="sm" onClick={handleCopyToClipboard}>
                <Copy className="mr-2 h-4 w-4" /> Copy Output
              </Button>
            </div>
            <Input
              id="outputText-md5"
              value={outputText}
              readOnly
              placeholder="Generated MD5 hash will appear here..."
              className="font-mono bg-muted/30 border-border focus-visible:ring-primary"
              aria-label="Generated MD5 hash output"
            />
          </div>
        )}
         <Alert variant="default" className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              MD5 is an older hashing algorithm. For security-sensitive applications like password hashing, it is recommended to use stronger algorithms such as SHA-256 (available in our other Hash Generator tool).
            </AlertDescription>
          </Alert>
      </CardContent>
    </Card>
  );
}
