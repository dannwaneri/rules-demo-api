export interface Feedback {
  message: string;
  rating: number;
}

function isValidFeedback(body: unknown): body is Feedback {
  return (
    typeof body === 'object' &&
    body !== null &&
    typeof (body as Feedback).message === 'string' &&
    typeof (body as Feedback).rating === 'number' &&
    (body as Feedback).rating >= 1 &&
    (body as Feedback).rating <= 5
  );
}

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/feedback' && request.method === 'POST') {
      const body = await request.json();

      if (!isValidFeedback(body)) {
        return new Response(JSON.stringify({ error: 'Invalid feedback payload' }), { status: 400 });
      }

      console.log('Received feedback with rating:', body.rating);

      return new Response(JSON.stringify({ received: true }), { status: 200 });
    }

    if (url.pathname === '/feedbackSummary' && request.method === 'GET') {
      return new Response(JSON.stringify({ status: 'ok', note: 'Summary endpoint placeholder' }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
  },
};
