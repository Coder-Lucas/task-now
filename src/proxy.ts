import { type NextProxy, NextResponse } from "next/server";

const proxy: NextProxy = () => {
    const response = NextResponse.next();

    const headers = new Headers({
        "Content-Security-Policy": "default-src 'self'; img-src *; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'",
        "Permissions-Policy": "camera=(), display-capture=(), geolocation=(), microphone=(), payment=()",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "Strict-Transport-Security": "max-age=31536000",
        "X-Content-Type-Options": "nosniff",
        "X-DNS-Prefetch-Control": "off",
        "X-Frame-Options": "DENY",
        "X-XSS-Protection": "1; mode=block"
    });

    for (const [key, value] of headers) {
        response.headers.set(key, value);
    }

    return response;
};

export default proxy;
