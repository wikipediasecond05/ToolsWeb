
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertCircle, Copy, Trash2, Replace } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import DynamicMonacoEditor from './editors/DynamicMonacoEditor';

// Basic CSV parser
const parseCSV = (csvString: string, delimiter: string): string[][] => {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let inQuotes = false;
  let currentField = '';

  for (let i = 0; i < csvString.length; i++) {
    const char = csvString[i];
    const nextChar = csvString[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') { 
        currentField += '"';
        i++; 
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === delimiter && !inQuotes) {
      currentRow.push(currentField);
      currentField = '';
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') { 
        i++;
      }
      currentRow.push(currentField);
      rows.push(currentRow);
      currentRow = [];
      currentField = '';
    } else {
      currentField += char;
    }
  }
  currentRow.push(currentField);
  if (currentRow.length > 0 || currentField) { 
      rows.push(currentRow);
  }
  
  if (rows.length > 0 && rows[rows.length - 1].length === 1 && rows[rows.length - 1][0] === '') {
    const lastRow = rows[rows.length -1];
    if (lastRow.every(field => field.trim() === '')) {
      rows.pop();
    }
  }
  return rows;
};


export function CSVToJSONTool() {
  const [csvInput, setCsvInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [hasHeader, setHasHeader] = useState(true);
  const [delimiter, setDelimiter] = useState(',');
  const [convertTypes, setConvertTypes] = useState(true);

  const handleConvert = () => {
    setError(null);
    setJsonOutput('');

    if (!csvInput.trim()) {
      setError('Please enter some CSV data to convert.');
      return;
    }
    if (!delimiter.trim()){
        setError('Delimiter cannot be empty.');
        return;
    }

    try {
      const parsedData = parseCSV(csvInput, delimiter === '\\t' ? '\t' : delimiter);
      if (parsedData.length === 0) {
        setError('No data found in CSV input.');
        return;
      }

      let headers: string[] = [];
      let dataRows: string[][] = [];

      if (hasHeader) {
        if (parsedData.length === 0) {
          setError('CSV data is empty, cannot extract header.');
          return;
        }
        headers = parsedData[0].map(header => header.trim());
        dataRows = parsedData.slice(1);
      } else {
        const numCols = parsedData[0]?.length || 0;
        if (numCols === 0 && parsedData.length === 1 && parsedData[0][0].trim() === '') {
            setJsonOutput('[]');
            return;
        }
        headers = Array.from({ length: numCols }, (_, i) => `column${i + 1}`);
        dataRows = parsedData;
      }
      
      if (headers.some(h => h === '')) {
        setError('Header row contains empty column names. Please check your CSV or uncheck "First row is header".');
        return;
      }

      const jsonArray = dataRows.map(row => {
        const obj: Record<string, any> = {};
        headers.forEach((header, index) => {
          let value: any = row[index] !== undefined ? row[index] : ''; 

          if (convertTypes) {
            if (value.trim() === '') {
                value = null;
            } else if (!isNaN(Number(value)) && value.trim() !== '') { 
              value = Number(value);
            } else if (value.toLowerCase() === 'true') {
              value = true;
            } else if (value.toLowerCase() === 'false') {
              value = false;
            }
          }
          obj[header] = value;
        });
        return obj;
      });

      setJsonOutput(JSON.stringify(jsonArray, null, 2));
    } catch (e: any) {
      console.error('Error converting CSV to JSON:', e);
      setError(`An error occurred during conversion: ${e.message || 'Unknown error'}`);
    }
  };

  const handleClear = () => {
    setCsvInput('');
    setJsonOutput('');
    setError(null);
  };

  const handleCopyOutput = async () => {
    if (!jsonOutput) {
      setError('No JSON output to copy.');
      return;
    }
    try {
      await navigator.clipboard.writeText(jsonOutput);
      setError(null);
    } catch (err) {
      console.error('Failed to copy JSON output:', err);
      setError('Failed to copy JSON to clipboard.');
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">CSV to JSON Converter</CardTitle>
        <CardDescription>
          Paste your CSV data, configure options, and convert it to JSON format.
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
          <Label htmlFor="csvInput-csv-json" className="font-semibold mb-2 block">Input CSV</Label>
           <div className="border rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent">
            <DynamicMonacoEditor
              language="plaintext"
              value={csvInput}
              onChange={(value) => setCsvInput(value || '')}
              aria-label="Input CSV data"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasHeader"
              checked={hasHeader}
              onCheckedChange={(checked) => setHasHeader(checked as boolean)}
            />
            <Label htmlFor="hasHeader" className="font-normal cursor-pointer">First row is header</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="convertTypes"
              checked={convertTypes}
              onCheckedChange={(checked) => setConvertTypes(checked as boolean)}
            />
            <Label htmlFor="convertTypes" className="font-normal cursor-pointer">Convert numbers & booleans</Label>
          </div>
          <div>
            <Label htmlFor="delimiter" className="font-semibold mb-2 block">Delimiter (use '\t' for tab)</Label>
            <Input
              id="delimiter"
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value)}
              className="w-full md:w-32"
              maxLength={5} 
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button onClick={handleConvert} className="w-full sm:w-auto">
            <Replace className="mr-2 h-4 w-4" /> Convert to JSON
          </Button>
          <Button variant="outline" onClick={handleClear} className="w-full sm:w-auto">
            <Trash2 className="mr-2 h-4 w-4" /> Clear
          </Button>
        </div>

        {jsonOutput && (
          <div className="grid gap-2 pt-4 border-t border-border">
            <div className="flex justify-between items-center">
              <Label htmlFor="jsonOutput-csv-json" className="font-semibold mb-2 block">Output JSON</Label>
              <Button variant="ghost" size="sm" onClick={handleCopyOutput}>
                <Copy className="mr-2 h-4 w-4" /> Copy Output
              </Button>
            </div>
            <div className="border rounded-md overflow-hidden">
              <DynamicMonacoEditor
                language="json"
                value={jsonOutput}
                options={{ readOnly: true }}
                aria-label="Output JSON data"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
