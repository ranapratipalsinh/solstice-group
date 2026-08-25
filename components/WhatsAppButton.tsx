import { WhatsAppIcon } from '@/components/icons/SocialIcons';

export function WhatsAppButton({ phoneNumber, message }: { phoneNumber: string; message: string }) {
    if (!phoneNumber) return null;

    const digitsOnly = phoneNumber.replace(/[^\d]/g, '');
    const href = `https://wa.me/${digitsOnly}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="fixed bottom-24 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:bg-[#1ebe57]"
        >
            <WhatsAppIcon className="h-6 w-6" />
        </a>
    );
}
