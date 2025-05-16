
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Copy, RefreshCw, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>/?~`';

export function PasswordGeneratorTool() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const generatePassword = () => {
    setError(null);
    let charset = '';
    if (includeUppercase) charset += uppercaseChars;
    if (includeLowercase) charset += lowercaseChars;
    if (includeNumbers) charset += numberChars;
    if (includeSymbols) charset += symbolChars;

    if (charset === '') {
      setError('Please select at least one character type.');
      setPassword('');
      return;
    }

    let newPassword = '';
    const cryptoObj = window.crypto || (window as any).msCrypto; 

    if (!cryptoObj || !cryptoObj.getRandomValues) {
        setError("Your browser does not support secure random number generation. Please use a modern browser.");
        // Fallback to Math.random (less secure)
        for (let i = 0; i < length; i++) {
            newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
        }
    } else {
        const randomValues = new Uint32Array(length);
        cryptoObj.getRandomValues(randomValues);
        for (let i = 0; i < length; i++) {
            newPassword += charset[randomValues[i] % charset.length];
        }
    }
    setPassword(newPassword);
  };

  const handleCopyToClipboard = async () => {
    if (!password) {
      toast({
        title: 'Nothing to copy',
        description: 'Generate a password first.',
        variant: 'destructive',
      });
      return;
    }
    try {
      await navigator.clipboard.writeText(password);
      toast({
        title: 'Password Copied!',
        description: 'The generated password has been copied to your clipboard.',
      });
    } catch (err) {
      console.error('Failed to copy password: ', err);
      toast({
        title: 'Copy Failed',
        description: 'Could not copy password to clipboard.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Password Generator</CardTitle>
        <CardDescription className="text-lg">
          Create strong, secure, and customizable passwords.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div>
            <Label htmlFor="passwordLength" className="mb-2 block font-semibold">
              Password Length: {length}
            </Label>
            <Slider
              id="passwordLength"
              min={8}
              max={128}
              step={1}
              value={[length]}
              onValueChange={(value) => setLength(value[0])}
              aria-label="Password length slider"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="includeUppercase" checked={includeUppercase} onCheckedChange={(checked) => setIncludeUppercase(checked as boolean)} />
              <Label htmlFor="includeUppercase" className="font-normal cursor-pointer mb-0">Include Uppercase (A-Z)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="includeLowercase" checked={includeLowercase} onCheckedChange={(checked) => setIncludeLowercase(checked as boolean)} />
              <Label htmlFor="includeLowercase" className="font-normal cursor-pointer mb-0">Include Lowercase (a-z)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="includeNumbers" checked={includeNumbers} onCheckedChange={(checked) => setIncludeNumbers(checked as boolean)} />
              <Label htmlFor="includeNumbers" className="font-normal cursor-pointer mb-0">Include Numbers (0-9)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="includeSymbols" checked={includeSymbols} onCheckedChange={(checked) => setIncludeSymbols(checked as boolean)} />
              <Label htmlFor="includeSymbols" className="font-normal cursor-pointer mb-0">Include Symbols (!@#$...)</Label>
            </div>
          </div>
        </div>

        <Button onClick={generatePassword} className="w-full sm:w-auto">
          <RefreshCw className="mr-2 h-4 w-4" /> Generate Password
        </Button>

        {password && (
          <div className="pt-4 space-y-2 border-t border-border">
            <Label htmlFor="generatedPasswordOutput" className="font-semibold mb-2 block">
              Generated Password:
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="generatedPasswordOutput"
                type="text"
                value={password}
                readOnly
                className="font-mono bg-muted/30 border-border focus-visible:ring-primary"
                aria-label="Generated password"
              />
              <Button variant="outline" size="icon" onClick={handleCopyToClipboard} aria-label="Copy password">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center text-sm text-muted-foreground mt-2">
                <ShieldCheck className="mr-2 h-4 w-4 text-green-500" />
                <span>This password is generated client-side and is not stored.</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
