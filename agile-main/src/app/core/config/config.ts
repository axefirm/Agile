import { FacebookLoginProvider, SocialAuthService } from "angularx-social-login";


export function provideConfig() {
    return {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('257979695974220')
    };
}