import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', error: 'Only POST allowed' });
  }

  const { message } = req.body;
  const botToken = '7509433067:AAGoLc1NVWqmgKGcrRVb3DwMh1o5_v5Fyio';
  const chatId = '8047420957';

  const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const tgResponse = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message })
    });

    if (!tgResponse.ok) {
      const errorText = await tgResponse.text();
      return res.status(500).json({ status: 'error', error: errorText });
    }

    return res.status(200).json({ status: 'ok' });
  } catch (error) {
    return res.status(500).json({ status: 'error', error: error.message });
  }
}
