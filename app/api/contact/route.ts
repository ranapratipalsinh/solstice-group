import { NextRequest, NextResponse } from 'next/server';
import { strapiCreate } from '@/lib/strapi';

export async function POST(request: NextRequest) {
    const body = await request.json().catch(() => null);

    if (!body || typeof body.name !== 'string' || typeof body.email !== 'string' || typeof body.message !== 'string') {
        return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    const { name, email, message, phone, company, enquiryType } = body;

    try {
        const response = await strapiCreate('/contact-submissions', { name, email, message, phone, company, enquiryType });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to submit your message.' }, { status: 502 });
        }

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Contact form is not configured yet.' }, { status: 500 });
    }
}
