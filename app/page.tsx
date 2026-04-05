'use client';

import { useState } from 'react';

export default function ShortsGenerator() {
  const [content, setContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async () => {
    if (!content) return;
    setIsGenerating(true);
    setResult(null);

    try {
      const response = await fetch('/api/generate-short', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: content }),
      });

      const data = await response.json();
      if (data.success) {
        setResult(data.data);
      } else {
        alert(data.error || 'An error occurred');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to connect to the server.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">AI Shorts Generator</h1>
          <p className="mt-2 text-gray-600">Enter your topic or article to generate a shot list.</p>
        </div>

        <div className="bg-white p-6 shadow-xl rounded-lg">
          <textarea
            className="w-full h-40 p-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none text-black"
            placeholder="Paste your content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !content}
            className={`mt-4 w-full py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-200 ${
              isGenerating ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isGenerating ? 'Drafting Script...' : 'Generate Script'}
          </button>
        </div>

        {/* Display the Resulting JSON */}
        {result && (
          <div className="bg-gray-900 rounded-lg p-6 overflow-hidden">
            <h2 className="text-xl font-bold text-white mb-4">Generated Shot List:</h2>
            <pre className="text-sm text-green-400 overflow-x-auto whitespace-pre-wrap">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}