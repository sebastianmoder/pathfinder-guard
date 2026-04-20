import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { DEFAULT_MODEL } from '@/lib/constants';

export const maxDuration = 60;

type StreamChunk = {
  error?: { message?: string } | string;
  id?: string;
  choices?: Array<{
    delta?: {
      content?: string | Array<{ type?: string; text?: string }>;
    };
    finish_reason?: string | null;
  }>;
};

export async function POST(request: Request) {
  try {
    const { messages, model = DEFAULT_MODEL, apiKey } = await request.json();

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
            const streamChunk = chunk as StreamChunk;
            const upstreamError =
              typeof streamChunk.error === 'string'
                ? streamChunk.error
                : streamChunk.error?.message;
            if (upstreamError) {
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({ error: upstreamError, generationId: streamChunk.id })}\n\n`
                )
              );
              controller.close();
              return;
            }

            const choice = streamChunk.choices?.[0];
            const finishReason = choice?.finish_reason;
            const deltaContent = choice?.delta?.content;
            const content =
              typeof deltaContent === 'string'
                ? deltaContent
                : Array.isArray(deltaContent)
                  ? deltaContent
                      .filter((part) => part.type === 'text' && typeof part.text === 'string')
                      .map((part) => part.text)
                      .join('')
                  : '';

            if (content) {
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({ content, generationId: streamChunk.id })}\n\n`
                )
              );
            }

            if (finishReason) {
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({ finishReason, generationId: streamChunk.id })}\n\n`
                )
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
