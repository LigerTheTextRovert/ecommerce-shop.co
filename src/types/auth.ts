export interface AuthResponse {
   provider_token: string;
   access_token: string;
   refresh_token: string;
   token_type: string;
   expires_in: number;
   expires_at: number;
   user: User;
}

interface User {
   id: string;
   email: string;
   role: string;
   aud: string;
   app_metadata: AppMetadata;
   user_metadata: UserMetadata;
   created_at: string;
   updated_at: string;
   last_sign_in_at: string;
}

interface AppMetadata {
   provider: string;
   providers: string[];
}

interface UserMetadata {
   full_name: string;
   name: string;
   email: string;
   email_verified: boolean;
   avatar_url: string;
   picture: string;
   provider_id: string;
}
