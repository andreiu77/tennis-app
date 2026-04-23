"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import QRCode from "qrcode";
import { authenticator } from "otplib";


const LoginPage = () => {
    const [step, setStep] = useState<"CREDENTIALS" | "TWO_FA">("CREDENTIALS");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(undefined);
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleCredentialSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (res?.error === "2FA_REQUIRED") {
            setStep("TWO_FA");
            setError("Two-factor code required");
        } else if (res?.error) {
            setError("Invalid credentials or 2FA code");
        } else if (res?.ok) {
            router.push("/");
        }
    };

    const handle2FASubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log(token);

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
            token,
        });


        if (res?.error) {
            setError("Invalid credentials or 2FA code");
        } else if (res?.ok) {
            router.push("/");
        }
    };

    const handleGetQRCode = async () => {
        const res = await fetch(`/api/auth/get-secret?email=${encodeURIComponent(email)}`);
        const secretData = await res.json();

        if (!res.ok) {
            setError("Secret not found");
            return;
        }

        const otpauth = authenticator.keyuri(email, "TennisApp", secretData.secret);
        const qr = await QRCode.toDataURL(otpauth);
        setQrCode(qr);
    };

    return (
        <div>
            <h1>Login</h1>

            {step === "CREDENTIALS" && (
                <form onSubmit={handleCredentialSubmit}>
                    <div>
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit">Next</button>
                </form>
            )}

            {step === "TWO_FA" && (
                <form onSubmit={handle2FASubmit}>
                    <div>
                        <label>2FA Code</label>
                        <input value={token} onChange={(e) => setToken(e.target.value)} />
                    </div>
                    <button type="submit">Verify</button>

                    <button type="button" onClick={handleGetQRCode}>Get QR Code</button>

                    {qrCode && (
                        <div>
                            <p>Scan this QR code with Google Authenticator:</p>
                            <img src={qrCode} alt="2FA QR Code" />
                        </div>
                    )}
                </form>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default LoginPage;
