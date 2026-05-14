import React, { Dispatch, SetStateAction, useState } from "react";


interface UserProfileState {
    enableParticles: boolean;
    setEnableParticles: Dispatch<SetStateAction<boolean>>;
}

const UserProfileContext = React.createContext<UserProfileState>({
    enableParticles: false,
    setEnableParticles: function (value: React.SetStateAction<boolean>): void {
        throw new Error("Function not implemented.");
    }
});

function UserProfileProvider({ children }: { children: React.ReactNode }) {
  const [enableParticles, setEnableParticles] = useState(true);

  return <UserProfileContext.Provider value={{ enableParticles, setEnableParticles }}>{children}</UserProfileContext.Provider>;
}

export {UserProfileContext}
export default UserProfileProvider