import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

interface ResponseData {
  success?: boolean;
  error?: string;
  data?: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, subject, message }: ContactFormData = req.body;

  // Validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      error: 'Missing required fields: name, email, subject, and message are required.',
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    const inquiry = await prisma.contactInquiry.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject,
        message,
      },
    });

    return res.status(200).json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    console.error('Error creating contact inquiry:', error);
    return res.status(500).json({
      error: 'Failed to submit your inquiry. Please try again later.',
    });
  }
}
