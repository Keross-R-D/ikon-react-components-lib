export interface DecodedUserJwtProps {
    sub: string;
    primaryAccountId: string;
    activeAccountId: string;
    platformAccess?: {
        roles?: string[];
    };
}
