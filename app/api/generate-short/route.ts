import { NextResponse } from 'next/server';
import { generateVideoScript } from '@/lib/scriptGenerator';

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text content is required' }, { status: 400 });
    }

    console.log('Starting AI generation pipeline...');
    
    const scriptData = await generateVideoScript(text);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Script Generated successfully!',
      data: scriptData 
    });

  } catch (error) {
    console.error('Pipeline Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}