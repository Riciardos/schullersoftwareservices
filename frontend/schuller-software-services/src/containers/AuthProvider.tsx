import React, {useState} from "react";

const AuthContext = React.createContext(
	{
		authenticated: false,
		authentication: {
			credential: ""
		},
	}
);
function AuthProvider(props: any) {

	const [googleAuth, setGoogleAuth] = useState({
		authenticated: false,
		authentication: {
			credential: ""
		}
	});
	const handleCredentialResponse = (response:any) => {
		console.log(response);
		setGoogleAuth({
			authenticated: true,
			authentication: response
		});
	}
	// @ts-ignore
	window.handleCredentialResponse = handleCredentialResponse;
	return (<AuthContext.Provider value={googleAuth}>{props.children}</AuthContext.Provider>);
}

export {
	AuthContext
};
export default AuthProvider;
