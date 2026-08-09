import { NextRequest, NextResponse } from 'next/server';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

export async function POST(request: NextRequest) {
    const token = process.env.STRAPI_API_TOKEN;
    if (!token) {
        return NextResponse.json({ error: 'Careers application is not configured yet.' }, { status: 500 });
    }

    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const resume = formData.get('resume');

    if (typeof name !== 'string' || typeof email !== 'string' || !(resume instanceof File)) {
        return NextResponse.json({ error: 'Name, email, and resume are required.' }, { status: 400 });
    }

    const phone = formData.get('phone');
    const message = formData.get('message');
    const jobOpeningId = formData.get('jobOpeningId');

    try {
        const uploadForm = new FormData();
        uploadForm.append('files', resume, resume.name);

        const uploadResponse = await fetch(`${STRAPI_URL}/api/upload`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: uploadForm,
        });

        if (!uploadResponse.ok) {
            return NextResponse.json({ error: 'Failed to upload resume.' }, { status: 502 });
        }

        const uploaded = await uploadResponse.json();
        const resumeId = uploaded?.[0]?.id;

        const applicationResponse = await fetch(`${STRAPI_URL}/api/job-applications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                data: {
                    name,
                    email,
                    phone: typeof phone === 'string' ? phone : '',
                    message: typeof message === 'string' ? message : '',
                    resume: resumeId,
                    jobOpening: typeof jobOpeningId === 'string' && jobOpeningId ? jobOpeningId : null,
                },
            }),
        });

        if (!applicationResponse.ok) {
            return NextResponse.json({ error: 'Failed to submit application.' }, { status: 502 });
        }

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Careers application is not configured yet.' }, { status: 500 });
    }
}
