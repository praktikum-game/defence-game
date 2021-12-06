declare namespace Express {
    interface Request {
        /**
         * Cryptographic nonce which is used to mark scripts as approved,
         * generated by express-yandex-csp middleware
         *
         * More about CSP headers:
         * https://content-security-policy.com/
         * https://www.w3.org/TR/CSP3/
         */
        nonce: string;
    }
}
