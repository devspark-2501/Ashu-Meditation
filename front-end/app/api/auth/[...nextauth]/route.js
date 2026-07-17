import { handlers } from '@/lib/auth';

if (!handlers || !handlers.GET || !handlers.POST) {
    throw new Error(
        '[auth route] `handlers` from @/lib/auth is missing GET/POST. ' +
            'This almost always means next-auth resolved to v4 instead of v5 ' +
            '(check `npm ls next-auth` for duplicate installs / a stray ' +
            'node_modules above the project root), or NextAuth(...) threw ' +
            'during initialization — check the server console for an earlier, ' +
            'swallowed error above this one.'
    );
}

export const { GET, POST } = handlers;