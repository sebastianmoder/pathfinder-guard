import OpenAI from 'openai';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { messages, model = 'stepfun/step-3.5-flash:free', apiKey } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const key = apiKey || process.env.OPENROUTER_API_KEY;
    if (!key) {
      return NextResponse.json(
        { error: 'No API key configured. Set OPENROUTER_API_KEY or provide a BYOK key.' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: key,
      baseURL: 'https://openrouter.ai/api/v1',
    });

    const stream = await openai.chat.completions.create({
      model,
      messages,
      stream: true,
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
              );
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : 'Stream error';
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: errorMessage })}\n\n`
            )
          );
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
