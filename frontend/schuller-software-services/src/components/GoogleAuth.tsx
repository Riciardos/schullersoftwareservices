import { useContext, useEffect } from 'react';
import { AuthContext } from '../containers/AuthProvider';
import './GoogleAuth.css';

const CLIENT_ID =
  '40668943377-4vb0kr2dds16iu6rs59jpak6hk2s2ga5.apps.googleusercontent.com';

function GoogleAuth() {
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    const init = () => {
      const google = (window as any).google;
      if (!google?.accounts?.id) return;

      google.accounts.id.initialize({ client_id: CLIENT_ID, callback: setAuth });
      google.accounts.id.renderButton(document.getElementById('google-signin-button'), {
        theme: 'outline',
        size: 'large',
      });
    };

    if ((window as any).google?.accounts?.id) {
      init();
    } else {
      const script = document.querySelector('script[src*="accounts.google.com/gsi/client"]');
      script?.addEventListener('load', init);
      return () => script?.removeEventListener('load', init);
    }
  }, [setAuth]);

  return (
    <div className="GoogleAuth">
      <div id="google-signin-button" />
    </div>
  );
}

export default GoogleAuth;
