import { AppState, Auth0Provider, User } from "@auth0/auth0-react";
import { ReactNode } from "react"
import { useNavigate } from "react-router-dom";


type Props = {
    children: ReactNode
}
const Auth0ProviderWithNavigate = ({ children }: Props) => {
    const navigate=useNavigate()
    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
    const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL
    const audience=import.meta.env.VITE_AUTH0_AUDIENCE
    
    if(!domain || !clientId || !redirectUri || !audience){
        throw new Error('Unavble to initialise auth')
    }
    
    const onRedirectCallback = (appState?: AppState, user?: User) => {
        navigate('/auth-callback')
    }
    
    return (
        <Auth0Provider domain={domain} clientId={clientId}
            authorizationParams={{
                redirect_uri: redirectUri,
                audience
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    )
}

export default Auth0ProviderWithNavigate
