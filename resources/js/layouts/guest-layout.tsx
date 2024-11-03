import { FlashMessage } from 'components/flash-message';
import { PropsWithChildren } from 'react';

export function GuestLayout({ children }: PropsWithChildren) {
    return (
        <div>
            <FlashMessage />
            {children}
        </div>
    );
}
