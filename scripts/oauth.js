
// OAuth Authentication Handler
class OAuthHandler {
    constructor() {
        this.initializeButtons();
    }

    initializeButtons() {
        // Google OAuth
        const googleBtns = document.querySelectorAll('.google-btn');
        googleBtns.forEach(btn => {
            btn.addEventListener('click', () => this.handleGoogleAuth());
        });

        // Facebook OAuth
        const facebookBtns = document.querySelectorAll('.facebook-btn');
        facebookBtns.forEach(btn => {
            btn.addEventListener('click', () => this.handleFacebookAuth());
        });

        // GitHub OAuth
        const githubBtns = document.querySelectorAll('.github-btn');
        githubBtns.forEach(btn => {
            btn.addEventListener('click', () => this.handleGitHubAuth());
        });
    }

    handleGoogleAuth() {
        // Google OAuth configuration
        const googleClientId = 'YOUR_GOOGLE_CLIENT_ID'; // Replace with actual client ID
        const redirectUri = encodeURIComponent(window.location.origin + '/auth/google/callback');
        const scope = encodeURIComponent('openid email profile');
        
        const googleAuthUrl = `https://accounts.google.com/oauth/v2/auth?` +
            `client_id=${googleClientId}&` +
            `redirect_uri=${redirectUri}&` +
            `scope=${scope}&` +
            `response_type=code&` +
            `state=google_auth`;

        console.log('Initiating Google OAuth...');
        window.location.href = googleAuthUrl;
    }

    handleFacebookAuth() {
        // Facebook OAuth configuration
        const facebookAppId = 'YOUR_FACEBOOK_APP_ID'; // Replace with actual app ID
        const redirectUri = encodeURIComponent(window.location.origin + '/auth/facebook/callback');
        
        const facebookAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?` +
            `client_id=${facebookAppId}&` +
            `redirect_uri=${redirectUri}&` +
            `scope=email,public_profile&` +
            `response_type=code&` +
            `state=facebook_auth`;

        console.log('Initiating Facebook OAuth...');
        window.location.href = facebookAuthUrl;
    }

    handleGitHubAuth() {
        // GitHub OAuth configuration
        const githubClientId = 'YOUR_GITHUB_CLIENT_ID'; // Replace with actual client ID
        const redirectUri = encodeURIComponent(window.location.origin + '/auth/github/callback');
        
        const githubAuthUrl = `https://github.com/login/oauth/authorize?` +
            `client_id=${githubClientId}&` +
            `redirect_uri=${redirectUri}&` +
            `scope=user:email&` +
            `state=github_auth`;

        console.log('Initiating GitHub OAuth...');
        window.location.href = githubAuthUrl;
    }

    // Handle OAuth callbacks
    handleOAuthCallback() {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        const error = urlParams.get('error');

        if (error) {
            console.error('OAuth Error:', error);
            alert('Authentication failed. Please try again.');
            return;
        }

        if (code && state) {
            this.processAuthCode(code, state);
        }
    }

    async processAuthCode(code, state) {
        try {
            console.log(`Processing ${state} authentication...`);
            
            // In a real application, you would send this code to your backend
            // which would exchange it for an access token
            const response = await fetch('/api/auth/callback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code: code,
                    provider: state.split('_')[0],
                    redirectUri: window.location.origin + `/auth/${state.split('_')[0]}/callback`
                })
            });

            if (response.ok) {
                const userData = await response.json();
                console.log('Authentication successful:', userData);
                // Redirect to dashboard or home page
                window.location.href = '/dashboard.html';
            } else {
                throw new Error('Authentication failed');
            }
        } catch (error) {
            console.error('Error processing authentication:', error);
            alert('Authentication failed. Please try again.');
        }
    }
}

// Initialize OAuth handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const oauthHandler = new OAuthHandler();
    
    // Check if current page is an OAuth callback
    if (window.location.search.includes('code=')) {
        oauthHandler.handleOAuthCallback();
    }
});
