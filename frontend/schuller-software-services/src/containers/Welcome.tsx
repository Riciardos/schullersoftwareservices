import {useContext, useEffect, useState} from "react";
import {AuthContext} from "./AuthProvider";


function Welcome(props:any) {
	const auth = useContext(AuthContext)

	const [greeting, setGreeting] = useState();

	useEffect(() => {
		fetch(process.env.REACT_APP_API_HOST + "/secured/greeting",
			{
				headers: {
					"Authorization": "Bearer " + auth.authentication.credential
				}
			})
			.then(res => res.json())
			.then(data => setGreeting(data.message))
	}, [auth])

	return (
		<div>
			{auth.authenticated ? greeting : "Welcome, please log in."}
		</div>
	)
}

export default Welcome;
